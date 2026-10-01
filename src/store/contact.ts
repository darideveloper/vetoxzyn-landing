import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { z } from "zod"
import { DEFAULT_FORM_COPY } from "@/data/copy"

// Per-avatar validation messages. Shape matches DEFAULT_FORM_COPY.errors and
// the contact.form.errors slice of the avatar schema. Pages inject their copy
// on mount; omitted strings fall back to the global defaults.
export type ErrorCopy = typeof DEFAULT_FORM_COPY.errors

export function buildContactSchema(errors: ErrorCopy) {
  const fields = z.object({
    name: z.string().trim().min(1, errors.name),
    email: z.string().trim().min(1, errors.emailRequired).email(errors.emailInvalid),
    message: z.string().trim().min(10, errors.message),
    clinica: z.string().trim().min(1, errors.clinica),
    telefono: z.string().trim().min(7, errors.telefono),
    ciudadEstado: z.string().trim().min(1, errors.ciudad),
    medioContacto: z.enum(["correo", "llamada", "whatsapp"], { message: errors.medio }),
    motivoInteres: z.enum(["problema", "informacion", "incorporacion"], { message: errors.motivo }),
    lineaTopico: z.boolean(),
    lineaInstalaciones: z.boolean(),
    lineaDistribucion: z.boolean(),
    aceptaAviso: z.boolean().refine((v) => v === true, {
      message:
        (errors as { aceptaAviso?: string }).aceptaAviso ?? "Debes aceptar el aviso de privacidad para continuar",
    }),
  })

  return fields.refine(
    (values) => values.lineaTopico || values.lineaInstalaciones || values.lineaDistribucion,
    { message: errors.interest, path: ["lineaTopico"] },
  )
}

// Default schema (global Spanish messages) — used before/without injection.
export const contactSchema = buildContactSchema(DEFAULT_FORM_COPY.errors)

export type ContactValues = z.infer<ReturnType<typeof buildContactSchema>>

export function buildFieldSchemaMap(schemas: z.ZodObject<any>[]): Map<string, z.ZodTypeAny> {
  const map = new Map<string, z.ZodTypeAny>()
  for (const schema of schemas) {
    for (const [field, fieldSchema] of Object.entries(schema.def.shape)) {
      if (map.has(field)) {
        throw new Error(`Field "${field}" appears in multiple schemas. Field names must be unique.`)
      }
      map.set(field, fieldSchema as z.ZodTypeAny)
    }
  }
  return map
}

// The refined schema keeps its field shape on `.def.shape` (Zod v4), so the
// per-field map can be rebuilt whenever the injected error copy changes.
const fieldsOf = (schema: ReturnType<typeof buildContactSchema>) =>
  buildFieldSchemaMap([schema as unknown as z.ZodObject<any>])

export const fieldSchemaMap = fieldsOf(contactSchema)

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
  errorCopy: ErrorCopy
  setField: (field: string, value: unknown) => void
  validateAll: () => boolean
  reset: () => void
  setLoading: (v: boolean) => void
  setSubmitted: (v: boolean) => void
  setSubmitError: (message: string | null) => void
  setErrorCopy: (copy: ErrorCopy) => void
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

// Build a per-field schema map lazily per error copy so injected messages
// drive per-keystroke validation messages too.
let activeErrorCopy: ErrorCopy = DEFAULT_FORM_COPY.errors
let activeFieldMap = fieldSchemaMap

export const useContactStore = create<ContactStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      errors: {},
      isLoading: false,
      isSubmitted: false,
      submitError: null,
      errorCopy: DEFAULT_FORM_COPY.errors,

      setErrorCopy: (copy: ErrorCopy) => {
        activeErrorCopy = copy
        activeFieldMap = fieldsOf(buildContactSchema(copy))
        set({ errorCopy: copy })
      },

      setField: (field: string, value: unknown) => {
        const fieldSchema = activeFieldMap.get(field.split(".").pop() ?? field)
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
        const result = buildContactSchema(activeErrorCopy).safeParse(values)
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
        const { errors, isLoading, isSubmitted, submitError, errorCopy, aceptaAviso, ...rest } = state
        return rest
      },
    }
  )
)
