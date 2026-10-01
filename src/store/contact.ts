import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { z } from "zod"

const contactFieldsSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  email: z.string().trim().min(1, "El correo electrónico es obligatorio").email("Correo electrónico inválido"),
  message: z.string().trim().min(10, "El mensaje debe tener al menos 10 caracteres"),
  clinica: z.string().trim().min(1, "La clínica u hospital es obligatorio"),
  telefono: z.string().trim().min(7, "Ingresa un teléfono o WhatsApp válido"),
  ciudadEstado: z.string().trim().min(1, "La ciudad o estado es obligatorio"),
  medioContacto: z.enum(["correo", "llamada", "whatsapp"], { message: "Selecciona un medio de contacto" }),
  motivoInteres: z.enum(["problema", "informacion", "incorporacion"], { message: "Selecciona el motivo de tu interés" }),
  lineaTopico: z.boolean(),
  lineaInstalaciones: z.boolean(),
  lineaDistribucion: z.boolean(),
  aceptaAviso: z.boolean().refine((v) => v === true, { message: "Debes aceptar el aviso de privacidad para continuar" }),
})

export const contactSchema = contactFieldsSchema.refine(
  (values) => values.lineaTopico || values.lineaInstalaciones || values.lineaDistribucion,
  { message: "Selecciona al menos una configuración de interés", path: ["lineaTopico"] },
)

export type ContactValues = z.infer<typeof contactSchema>

export function buildFieldSchemaMap(schemas: z.ZodObject<any>[]): Map<string, z.ZodTypeAny> {
  const map = new Map<string, z.ZodTypeAny>()
  for (const schema of schemas) {
    for (const [field, fieldSchema] of Object.entries(schema.shape)) {
      if (map.has(field)) {
        throw new Error(`Field "${field}" appears in multiple schemas. Field names must be unique.`)
      }
      map.set(field, fieldSchema as z.ZodTypeAny)
    }
  }
  return map
}

export const fieldSchemaMap = buildFieldSchemaMap([contactFieldsSchema])

export const initialState: ContactValues = {
  name: "",
  email: "",
  message: "",
  clinica: "",
  telefono: "",
  ciudadEstado: "",
  medioContacto: "",
  motivoInteres: "",
  lineaTopico: false,
  lineaInstalaciones: false,
  lineaDistribucion: false,
  aceptaAviso: false,
}

interface ContactStore extends ContactValues {
  errors: Record<string, string>
  isLoading: boolean
  isSubmitted: boolean
  submitError: string | null
  setField: (field: string, value: unknown) => void
  validateAll: () => boolean
  reset: () => void
  setLoading: (v: boolean) => void
  setSubmitted: (v: boolean) => void
  setSubmitError: (message: string | null) => void
}

export function getNestedValue(obj: Record<string, any>, path: string): unknown {
  return path.split(".").reduce((acc, key) => acc?.[key], obj)
}

function setNestedValue(obj: Record<string, any>, path: string, value: unknown): Record<string, any> {
  const keys = path.split(".")
  const root: Record<string, any> = Array.isArray(obj) ? [...obj] : { ...obj }
  let node = root
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    node[key] = Array.isArray(node[key]) ? [...node[key]] : { ...(node[key] ?? {}) }
    node = node[key]
  }
  node[keys[keys.length - 1]] = value
  return root
}

// Fail-open storage: localStorage throws in private mode, strict ETP,
// Brave Shields, and restricted WebViews. Degrade to unpersisted form
// state instead of crashing the contact island.
const memory = new Map<string, string>()
const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name)
    } catch {
      return memory.get(name) ?? null
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value)
    } catch {
      memory.set(name, value)
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name)
    } catch {
      memory.delete(name)
    }
  },
}

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      errors: {},
      isLoading: false,
      isSubmitted: false,
      submitError: null,

      setField: (field: string, value: unknown) => {
        const fieldSchema = fieldSchemaMap.get(field.split(".").pop() ?? field)
        set((state) => {
          const newErrors = { ...state.errors }
          if (fieldSchema) {
            const validation = fieldSchema.safeParse(value)
            if (!validation.success) {
              newErrors[field] = validation.error.issues[0]?.message ?? "Valor inválido"
            } else {
              delete newErrors[field]
            }
          }
          const base = field.includes(".")
            ? setNestedValue(state as unknown as Record<string, any>, field, value)
            : { ...state, [field]: value }
          if (["lineaTopico", "lineaInstalaciones", "lineaDistribucion"].some((interestField) => Boolean(base[interestField]))) {
            delete newErrors.lineaTopico
          }
          return { ...base, errors: newErrors }
        })
      },

      validateAll: () => {
        const state = get()
        const allErrors: Record<string, string> = {}
        const values = Object.fromEntries(Object.keys(initialState).map((field) => [field, state[field as keyof ContactValues]]))
        const result = contactSchema.safeParse(values)
        if (!result.success) {
          for (const issue of result.error.issues) {
            allErrors[String(issue.path[0] ?? "form")] ??= issue.message
          }
        }
        set({ errors: allErrors })
        return Object.keys(allErrors).length === 0
      },

      reset: () => set({ ...initialState, errors: {}, isLoading: false, isSubmitted: false, submitError: null }),
      setLoading: (v: boolean) => set({ isLoading: v }),
      setSubmitted: (v: boolean) => set({ isSubmitted: v }),
      setSubmitError: (message: string | null) => set({ submitError: message }),
    }),
    {
      name: "vetoxzyn-contact-storage",
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => {
        const { errors, isLoading, isSubmitted, submitError, aceptaAviso, ...rest } = state
        return rest
      },
    }
  )
)
