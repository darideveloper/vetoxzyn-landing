import { Checkbox } from "@/components/atoms/Checkbox"

export function InterestPicker() {
  return (
    <div>
      <p className="mb-4 text-xs font-bold tracking-widest text-on-surface/70 uppercase">¿Qué línea te interesa?</p>
      <div className="flex flex-wrap gap-3">
        <Checkbox field="lineaTopico" label="Tópico" />
        <Checkbox field="lineaInstalaciones" label="Instalaciones" />
        <Checkbox field="lineaDistribucion" label="Distribución" />
      </div>
    </div>
  )
}
