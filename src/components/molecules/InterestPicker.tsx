import { Checkbox } from "@/components/atoms/Checkbox"
import { useContactStore } from "@/store/contact"

export function InterestPicker({ idPrefix = "" }: { idPrefix?: string }) {
  const error = useContactStore((state) => state.errors.lineaTopico)

  return (
    <fieldset aria-required="true" className="border-0 p-0">
      <legend className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface/70">¿Qué configuración te interesa?</legend>
      <div className="flex flex-col gap-3">
        <Checkbox field="lineaTopico" idPrefix={idPrefix} label="Higiene vinculada al paciente" />
        <Checkbox field="lineaInstalaciones" idPrefix={idPrefix} label="Higiene de espacios y procesos" />
        <Checkbox field="lineaDistribucion" idPrefix={idPrefix} label="Distribución" />
      </div>
      {error && <p role="alert" className="mt-3 text-xs font-medium italic text-error">{error}</p>}
    </fieldset>
  )
}
