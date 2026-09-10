import { Button } from "@/components/atoms/Button"

export function FormSuccess({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-brand-orange/40 via-white/60 to-brand-pink/40 p-[1.5px] shadow-2xl rotate-[-1deg] lg:rotate-[-2deg]">
      <div className="glass-panel-heavy relative w-full overflow-hidden rounded-[calc(1.5rem-1.5px)] p-10 md:p-14">
        <span aria-hidden="true" className="material-symbols-outlined text-tertiary text-5xl">check_circle</span>
        <p role="status" className="font-body-lg text-body-lg mt-4 text-on-surface">
          Gracias — tu mensaje fue registrado. Te contactaremos pronto.
        </p>
        <p className="mt-2 text-sm text-black/60">
          Revisa tu correo — te escribiremos desde la clínica matriz.
        </p>
        <p className="mt-6">
          <Button onClick={onReset} size="sm">Enviar otro mensaje</Button>
        </p>
      </div>
    </div>
  )
}
