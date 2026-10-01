import { Checkbox } from "@/components/atoms/Checkbox"
import { useContactStore } from "@/store/contact"

interface Props {
  idPrefix?: string
  legend: string
  labels: { topico: string; instalaciones: string; distribucion: string }
}

export function InterestPicker({ idPrefix = "", legend, labels }: Props) {
  const error = useContactStore((state) => state.errors.lineaTopico)

  return (
    <fieldset aria-required="true" className="border-0 p-0">
      <legend className="mb-4 text-xs font-bold uppercase tracking-widest text-on-surface/70">{legend}</legend>
      <div className="flex flex-col gap-3">
        <Checkbox field="lineaTopico" idPrefix={idPrefix} label={labels.topico} />
        <Checkbox field="lineaInstalaciones" idPrefix={idPrefix} label={labels.instalaciones} />
        <Checkbox field="lineaDistribucion" idPrefix={idPrefix} label={labels.distribucion} />
      </div>
      {error && <p role="alert" className="mt-3 text-xs font-medium italic text-error">{error}</p>}
    </fieldset>
  )
}
