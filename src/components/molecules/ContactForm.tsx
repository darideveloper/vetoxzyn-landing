import * as React from "react"
import { Button } from "@/components/atoms/Button"
import { Input } from "@/components/atoms/Input"
import { Textarea } from "@/components/atoms/Textarea"
import { FormRow } from "@/components/molecules/FormRow"
import { InterestPicker } from "@/components/molecules/InterestPicker"
import { FormSuccess } from "@/components/molecules/FormSuccess"
import { useContactStore } from "@/store/contact"

// ponytail: stub submit — success is local-only until the contact API lands,
// then call src/lib/api/contact.ts here instead of setSubmitted(true).
export function ContactForm() {
  const isSubmitted = useContactStore((state) => state.isSubmitted)
  const setSubmitted = useContactStore((state) => state.setSubmitted)
  const reset = useContactStore((state) => state.reset)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const store = useContactStore.getState()
    if (!store.validateAll()) return
    setSubmitted(true)
  }

  if (isSubmitted) {
    return <FormSuccess onReset={() => reset()} />
  }

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-brand-orange/40 via-white/60 to-brand-pink/40 p-[1.5px] shadow-2xl transition-all duration-[var(--duration-hover)] ease-[var(--ease-hover)] rotate-[-1deg] motion-safe:hover:rotate-0 motion-safe:focus-within:-translate-y-0.5 lg:rotate-[-2deg]">
      <div className="glass-panel-heavy relative w-full overflow-hidden rounded-[calc(1.5rem-1.5px)] p-10 md:p-14">
        <div aria-hidden="true" className="absolute top-8 right-8 h-12 w-12 rounded-full bg-brand-orange opacity-50 blur-xl mix-blend-multiply"></div>
        <div aria-hidden="true" className="absolute bottom-8 left-8 h-12 w-12 rounded-full bg-brand-pink opacity-40 blur-xl mix-blend-multiply"></div>
        <div className="relative z-10 mb-10 flex items-center gap-4">
          <span aria-hidden="true" className="material-symbols-outlined bg-gradient-to-br from-brand-orange to-brand-pink bg-clip-text text-4xl text-transparent">biotech</span>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-black/50">Protocolo de integración</p>
            <h3 className="font-display-lg text-2xl font-bold text-on-surface">Solicita tu diagnóstico</h3>
          </div>
        </div>
        <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-8">
          <FormRow>
            <Input field="name" label="Nombre" placeholder="Dr. Juan Pérez" autoComplete="name" />
            <Input field="clinica" label="Clínica / Hospital" placeholder="Hospital Veterinario Central" autoComplete="organization" />
          </FormRow>
          <FormRow>
            <Input field="telefono" label="Teléfono / WhatsApp" type="tel" placeholder="+52 55 1234 5678" autoComplete="tel" />
            <Input field="email" label="Correo" type="email" placeholder="contacto@clinica.com" autoComplete="email" />
          </FormRow>
          <InterestPicker />
          <Textarea field="message" label="Mensaje" placeholder="Especifique sus requerimientos de volumen o dudas adicionales..." rows={3} />
          <div className="flex flex-col items-stretch gap-4 pt-6 md:items-end">
            <Button type="submit" size="sm" className="deep-float-shadow group w-full justify-center md:w-auto">
              Enviar solicitud
              <span className="material-symbols-outlined text-3xl transition-transform duration-[var(--duration-hover)] ease-[var(--ease-hover)] motion-safe:group-hover:translate-x-1" aria-hidden="true">arrow_forward</span>
            </Button>
            <p className="text-center text-xs text-black/50 md:text-right">Respuesta en menos de 24 h · Sin compromiso</p>
          </div>
        </form>
      </div>
    </div>
  )
}
