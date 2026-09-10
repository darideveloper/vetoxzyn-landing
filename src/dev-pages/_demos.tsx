import * as React from "react"
import { Button } from "@/components/atoms/Button"
import { Checkbox } from "@/components/atoms/Checkbox"
import { Input } from "@/components/atoms/Input"
import { Textarea } from "@/components/atoms/Textarea"

// Page-local demo bindings (underscore file: never a route). Each atom gets an
// isolated useState hook so the showcase never touches the real contact store.
function useDemoField(initial: unknown) {
  const [value, setValue] = React.useState(initial)
  return (_field: string) => ({
    value,
    error: undefined as string | undefined,
    setValue: (v: unknown) => setValue(v),
    mounted: true,
  })
}

export function DesignSystemDemos() {
  const nameHook = useDemoField("Dr. Juan Pérez")
  const emailHook = useDemoField("contacto@clinica.com")
  const areaHook = useDemoField("")
  const checkHook = useDemoField(false)

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        <Input field="demo-name" useField={nameHook} label="Nombre" placeholder="Dr. Juan Pérez" />
        <Input field="demo-mail" useField={emailHook} label="Correo" type="email" placeholder="contacto@clinica.com" />
      </div>
      <Textarea field="demo-msg" useField={areaHook} label="Mensaje" placeholder="Especifique sus requerimientos..." rows={3} />
      <div className="flex flex-wrap gap-3">
        <Checkbox field="demo-topico" useField={checkHook} label="Tópico" />
        <Checkbox field="demo-inst" useField={checkHook} label="Instalaciones" />
        <Checkbox field="demo-dist" useField={checkHook} label="Distribución" />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="primary" size="sm">
          Enviar solicitud
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        <Button variant="primary" size="md">
          Cotiza para tu clínica
          <span className="material-symbols-outlined">arrow_forward</span>
        </Button>
        <Button variant="secondary" size="md">Ver línea Tópico</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Button variant="product" tone="light">
          Ver ficha Técnica
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Button>
        <Button variant="product" tone="dark">
          Ver ficha Técnica
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </Button>
      </div>
    </div>
  )
}
