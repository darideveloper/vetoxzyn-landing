import * as React from "react"
import { Button } from "@/components/atoms/Button"
import { Checkbox } from "@/components/atoms/Checkbox"
import { Input } from "@/components/atoms/Input"
import { Textarea } from "@/components/atoms/Textarea"
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
    return (
      <div className="glass-panel-heavy w-full rounded-3xl p-10 md:p-14 lg:rotate-[-2deg]">
        <p role="status" className="font-body-lg text-body-lg text-on-surface">
          Gracias — tu mensaje fue registrado. Te contactaremos pronto.
        </p>
        <p className="mt-4">
          <Button onClick={() => reset()} size="sm">Enviar otro mensaje</Button>
        </p>
      </div>
    )
  }

  return (
    <div className="glass-panel-heavy relative w-full rounded-3xl p-10 transition-transform duration-500 md:p-14 lg:rotate-[-2deg] lg:hover:rotate-0">
      <div aria-hidden="true" className="absolute top-8 right-8 h-12 w-12 rounded-full bg-brand-orange opacity-50 blur-xl mix-blend-multiply"></div>
      <form onSubmit={handleSubmit} noValidate className="relative z-10 space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Input field="name" label="Nombre" placeholder="Dr. Juan Pérez" autoComplete="name" />
          <Input field="clinica" label="Clínica / Hospital" placeholder="Hospital Veterinario Central" autoComplete="organization" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Input field="telefono" label="Teléfono / WhatsApp" type="tel" placeholder="+52 55 1234 5678" autoComplete="tel" />
          <Input field="email" label="Correo" type="email" placeholder="contacto@clinica.com" autoComplete="email" />
        </div>
        <div>
          <p className="mb-4 text-xs font-bold tracking-widest text-black/70 uppercase">¿Qué línea te interesa?</p>
          <div className="flex flex-wrap gap-3">
            <Checkbox field="lineaTopico" label="Tópico" />
            <Checkbox field="lineaInstalaciones" label="Instalaciones" />
            <Checkbox field="lineaDistribucion" label="Distribución" />
          </div>
        </div>
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
