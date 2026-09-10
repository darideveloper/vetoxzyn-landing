import { Checkbox } from "@/components/atoms/Checkbox"

export function InterestPicker({ idPrefix = "" }: { idPrefix?: string }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold tracking-widest text-on-surface/70 uppercase">¿Qué línea te interesa?</p>
      <div className="flex flex-wrap gap-3">
        <Checkbox field="lineaTopico" idPrefix={idPrefix} label="Tópico" />
        <Checkbox field="lineaInstalaciones" idPrefix={idPrefix} label="Instalaciones" />
        <Checkbox field="lineaDistribucion" idPrefix={idPrefix} label="Distribución" />
      </div>
    </div>
  )
}
