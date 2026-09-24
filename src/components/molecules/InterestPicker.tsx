import { Checkbox } from "@/components/atoms/Checkbox"

export function InterestPicker({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold tracking-widest text-on-surface/70 uppercase">¿Qué configuración te interesa?</p>
      <div className="flex flex-col gap-3">
        <Checkbox field="lineaTopico" idPrefix={idPrefix} label="Higiene vinculada al paciente" />
        <Checkbox field="lineaInstalaciones" idPrefix={idPrefix} label="Higiene de espacios y procesos" />
        <Checkbox field="lineaDistribucion" idPrefix={idPrefix} label="Distribución" />
      </div>
    </div>
  )
}
