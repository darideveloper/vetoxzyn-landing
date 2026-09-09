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
      <div className="p-2">
        <p role="status">Gracias — tu mensaje fue registrado. Te contactaremos pronto.</p>
        <p className="mt-4">
          <Button onClick={() => reset()} size="sm">Enviar otro mensaje</Button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-[32rem] flex-col gap-2">
      <Input field="name" label="Nombre" placeholder="Dr. Juan Pérez" autoComplete="name" />
      <Input field="clinica" label="Clínica / Hospital" placeholder="Hospital Veterinario Central" autoComplete="organization" />
      <Input field="telefono" label="Teléfono / WhatsApp" type="tel" placeholder="+52 55 1234 5678" autoComplete="tel" />
      <Input field="email" label="Correo" type="email" placeholder="contacto@clinica.com" autoComplete="email" />
      <div className="flex flex-wrap gap-3 p-2">
        <Checkbox field="lineaTopico" label="Tópico" />
        <Checkbox field="lineaInstalaciones" label="Instalaciones" />
        <Checkbox field="lineaDistribucion" label="Distribución" />
      </div>
      <Textarea field="message" label="Mensaje" placeholder="Especifique sus requerimientos de volumen o dudas adicionales..." rows={5} />
      <div className="p-2">
        <Button type="submit" size="sm">Enviar solicitud</Button>
      </div>
    </form>
  )
}
