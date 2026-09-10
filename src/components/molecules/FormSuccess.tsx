import { Button } from "@/components/atoms/Button"

export function FormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="glass-panel-heavy w-full rounded-3xl p-10 md:p-14 rotate-[-1deg] lg:rotate-[-2deg]">
      <p role="status" className="font-body-lg text-body-lg text-on-surface">
        Gracias — tu mensaje fue registrado. Te contactaremos pronto.
      </p>
      <p className="mt-4">
        <Button onClick={onReset} size="sm">Enviar otro mensaje</Button>
      </p>
    </div>
  )
}
