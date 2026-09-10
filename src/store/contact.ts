import { create } from "zustand"
import { persist } from "zustand/middleware"
import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  email: z.string().email("Correo electrónico inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
  clinica: z.string(),
  telefono: z.string(),
  lineaTopico: z.boolean(),
  lineaInstalaciones: z.boolean(),
  lineaDistribucion: z.boolean(),
})

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

export const fieldSchemaMap = buildFieldSchemaMap([contactSchema])

export const initialState = {
  name: "",
  email: "",
  message: "",
  clinica: "",
  telefono: "",
  lineaTopico: false,
  lineaInstalaciones: false,
  lineaDistribucion: false,
}

interface ContactStore extends ContactValues {
  errors: Record<string, string>
  isLoading: boolean
  isSubmitted: boolean
  setField: (field: string, value: unknown) => void
  validateAll: () => boolean
  reset: () => void
  setSubmitted: (v: boolean) => void
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

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      errors: {},
      isLoading: false,
      isSubmitted: false,

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
          return { ...base, errors: newErrors }
        })
      },

      validateAll: () => {
        const state = get()
        const allErrors: Record<string, string> = {}
        for (const [fieldName, schema] of fieldSchemaMap) {
          const value = (state as unknown as Record<string, unknown>)[fieldName]
          const result = schema.safeParse(value)
          if (!result.success) {
            allErrors[fieldName] = result.error.issues[0]?.message ?? "Valor inválido"
          }
        }
        set({ errors: allErrors })
        return Object.keys(allErrors).length === 0
      },

      reset: () => set({ ...initialState, errors: {}, isLoading: false, isSubmitted: false }),
      setSubmitted: (v: boolean) => set({ isSubmitted: v }),
    }),
    {
      name: "vetoxzyn-contact-storage",
      partialize: (state) => {
        const { errors, isLoading, isSubmitted, ...rest } = state
        return rest
      },
    }
  )
)
