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
    <div className="glass-panel-heavy relative w-full rounded-3xl p-10 transition-transform duration-[var(--duration-hover)] ease-[var(--ease-hover)] md:p-14 rotate-[-1deg] motion-safe:hover:rotate-0 lg:rotate-[-2deg]">
      <div aria-hidden="true" className="absolute top-8 right-8 h-12 w-12 rounded-full bg-brand-orange opacity-50 blur-xl mix-blend-multiply"></div>
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
        <div className="flex justify-end pt-6">
          <Button type="submit" size="sm" className="deep-float-shadow w-full justify-center md:w-auto">
            Enviar solicitud
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">arrow_forward</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
