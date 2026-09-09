# Páginas de Cliente / Avatar — Layout y Contenido

Páginas especializadas por cliente / avatar / target. Mismo layout para todas, datos específicos por cliente.

Fuentes: `docs/client-docs/` (Avatares Objetivos, Manual de Comunicación y Copywriting V2, Master de Producto, Fichas Técnicas).

---

## Estructura: 5 secciones fijas

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. HERO                                                          │
├──────────────────────────────────────────────────────────────────┤
│ 2. DOLOR → SOLUCIÓN (3 pares) + 3 bullets de valor               │
├──────────────────────────────────────────────────────────────────┤
│ 3. GALERÍA DE PRODUCTO (cards: imagen · ppm · pH · presentación) │
├──────────────────────────────────────────────────────────────────┤
│ 4. TESTIMONIOS (3 quotes del mismo segmento)                     │
├──────────────────────────────────────────────────────────────────┤
│ 5. CONTACTO + FAQ + DISCLAIMER (formulario al fondo)             │
└──────────────────────────────────────────────────────────────────┘
```

Mobile: misma jerarquía, galería en swipe (Hero → Dolor/Solución → Galería swipe → Testimonios → Contacto).

---

## 1. Hero

```
┌───────────────────────────────────────────────────────────────┐
│ [eyebrow]  Tecnología oxidativa para práctica veterinaria      │
│                                                               │
│ H1  vetoxzyn®: [promesa específica del avatar]                │
│                                                               │
│ H2  [solución oxidativa de alta pureza → beneficio avatar]    │
│                                                               │
│   [ CTA principal ]   [ CTA secundario ]                      │
│                                                               │
│ badges de confianza                                           │
└───────────────────────────────────────────────────────────────┘
```

- CTA principal → ancla al formulario (sección 5).
- CTA secundario → ancla a la galería (sección 3).
- Badges de confianza: pH neutro · HOCl biomimético · Grado 0 de irritación · Cero corrosión · Sin residuos persistentes.

---

## 2. Dolor → Solución

Filtro P.A.I.N. del manual: el avatar entra por su dolor concreto, no por el producto.

```
DOLOR                          → SOLUCIÓN vetoxzyn®
─────────────────────────────────────────────────────────────
[dolor 1 del avatar]           → [respuesta vetoxzyn®]

[dolor 2 del avatar]           → [respuesta vetoxzyn®]

[dolor 3 del avatar]           → [respuesta vetoxzyn®]

Bullets de valor (fijos):
 1. Tecnología Biomimética — imita la respuesta natural celular
 2. Seguridad Superior — alta tolerancia en tejido vivo
 3. Rentabilidad Operativa — protege el equipo / evita corrosión
```

---

## 3. Galería de producto

Cards según la línea de producto que compra el avatar (nunca la matriz completa).

```
┌───────────────┐ ┌───────────────┐
│ [imagen]      │ │ [imagen]      │
│ TÓPICO        │ │ INSTALACIONES │
│ 100 ppm       │ │ 500 ppm       │
│ pH 6.0–7.5    │ │ pH 6.0–7.5    │
│ [presentación]│ │ [presentación]│
│ [uso destacado]│ │ [uso destacado]│
│ "No requiere  │ │ "No requiere  │
│  enjuague"    │ │  enjuague"    │
│ [Ver ficha]   │ │ [Ver ficha]   │
└───────────────┘ └───────────────┘
```

Datos técnicos (Master de Producto):

| Especificación | Tópico | Instalaciones |
|---|---|---|
| Ingrediente activo | Ácido Hipocloroso (HOCl) | Ácido Hipocloroso (HOCl) |
| Concentración | 100 ppm (0.010%) | 500 ppm (0.050%) |
| pH | 6.0–7.5 (neutro) | 6.0–7.5 (neutro) |
| Potencial redox (ORP) | > 850 mV | > 900 mV |
| Presentaciones | 30ml a 950ml | 1L, 4L, 20L |
| Toxicidad | Grado 0 (no irritante) | Grado 0 (no irritante) |
| Apariencia / Olor | Líquido transparente / suave a cloro | Líquido transparente / suave a cloro |

- Fórmula: H₂O + NaCl + electrólisis de membrana = HOCl.
- Mecanismo: lisis por oxidación (destruye pared celular y desnaturaliza proteínas/ADN del patógeno en segundos).
- No genera residuos persistentes · biodegradable · no induce resistencia microbiana.

---

## 4. Testimonios

3 quotes del mismo segmento que el avatar (validación social del par).

```
«[quote]» — [nombre] · [rol / organización] · [ciudad]
«[quote]» — [nombre] · [organización]
«[quote]» — [nombre] · [organización]
```

---

## 5. Contacto + FAQ + Disclaimer

```
┌───────────────────────────────────────────────────────────────┐
│ H2  [llamado a la acción del avatar]                          │
│                                                               │
│  ┌─────────────────────┐  ┌─────────────────────┐             │
│  │ Nombre              │  │ Organización        │             │
│  ├─────────────────────┤  ├─────────────────────┤             │
│  │ Teléfono / WhatsApp │  │ Correo              │             │
│  ├─────────────────────┴──┴─────────────────────┤             │
│  │ ¿Qué línea te interesa? ☐ Tópico  ☐ Instalaciones  ☐ Dist│ │
│  ├──────────────────────────────────────────────┤             │
│  │ Mensaje                                      │             │
│  ├──────────────────────────────────────────────┤             │
│  │            [ Enviar solicitud ]              │             │
│  └──────────────────────────────────────────────┘             │
│                                                               │
│ FAQ (objeciones del avatar, respuestas del manual)            │
│                                                               │
│ ⚠ vetoxzyn® no es un medicamento, consulte a su médico        │
│   veterinario.                                                │
└───────────────────────────────────────────────────────────────┘
```

Formulario: solo UI por ahora (sin backend). Campos: Nombre · Organización · Teléfono/WhatsApp · Correo · Línea de interés (checkboxes) · Mensaje.

FAQ: 2–3 preguntas con las objeciones típicas del avatar, respondidas con el wording defendible del manual (sección 4).

Disclaimer siempre visible al pie.

---

## Contenido por avatar (mapeo)

### A1 — Socio Crecimiento (Distribuidores, mayoristas, revendedores)
- **Hero:** escalabilidad, margen, movimiento de inventario.
- **Galería:** ambas líneas; énfasis en presentaciones 1L/4L/20L.
- **FAQ:** volúmenes, esquemas de distribución, suministro.

### A2 — Dr. Resultados (MVZ, clínicas, hospitales, cirujanos veterinarios)
- **Hero:** bioseguridad clínica, protección de instrumental.
- **Galería:** Tópico (30–950ml) + Instalaciones.
- **FAQ:** "¿Es desinfectante de grado médico?", "¿Cura heridas?", "¿Deja residuos en quirófano?".

### A3 — Ingeniero Eficiencia (Productores: cerdos, aves, ganado, leche)
- **Hero:** higiene de ubre pre/post ordeño, agua de bebida, biofilm.
- **Galería:** Instalaciones (1L/4L/20L).
- **FAQ:** "¿Cura la mastitis?".

### A4 — Guardián de Aire (Cetreros, colombófilos, aves de alto valor)
- **Hero:** nebulización segura con aves presentes, seguridad de vías respiratorias.
- **Galería:** Tópico + Instalaciones (énfasis en dilución 1:10 aire).

### A5 — Estratega de Fauna (Zoológicos, rescatistas, exóticos)
- **Hero:** inocuidad extrema, prestigio de proyectos.
- **Galería:** ambas líneas.

### A6 — Dueño Responsable (Consumidor final, perros y gatos)
- **Hero:** limpieza tópica segura de piel, no irritante.
- **Galería:** Tópico (presentación consumidor).
- **FAQ:** "¿Cura las heridas de mi mascota?".
- Canal de marketing pull (automático, no fuerza de ventas).

---

## Reglas inquebrantables de marca (Manual V2)

- Marca siempre **`vetoxzyn®`** (minúsculas + símbolo ®).
- Vocabulario seguro: bioseguridad, higiene oxidativa, limpieza externa especializada, mantenimiento de condiciones higiénicas óptimas, tecnología oxidativa, biomimético, biodegradable, alta seguridad en tejido vivo.
- Palabras prohibidas: cura, sana, tratamiento, cicatriza, antibiótico, antimicrobiano, esterilizador médico, desinfectante clínico.
- Mensaje centrado en bioseguridad, higiene oxidativa y prevención (nunca curación/tratamiento).
- Distancia comunicacional absoluta frente a competidores (ej. Vetzyn).
- Disclaimer obligatorio: `vetoxzyn® no es un medicamento, consulte a su médico veterinario.`

---

## Fórmulas de copy aprobadas (Manual 3.1 / 3.2)

- **B2B preventivo:** "Eleva la bioseguridad de tu [espacio]. vetoxzyn® es la solución oxidativa que asegura tus espacios y protege tu [equipo] sin causar corrosión."
- **B2C/B2B cuidado animal:** "¿Buscas una limpieza tópica segura? vetoxzyn® ayuda a mantener condiciones higiénicas óptimas en la piel de los animales gracias a su fórmula biomimética de alta pureza y muy baja irritabilidad."
- **Rentabilidad/instrumental:** "Deja de reemplazar [equipo] dañado por el cloro. La tecnología de vetoxzyn® ofrece limpieza superficial avanzada con cero corrosión, protegiendo tu inversión y optimizando tus márgenes."
- **Titular estándar:** "vetoxzyn®: Solución Oxidativa Avanzada."

---

## Notas de implementación

- Datos por cliente en archivos de contenido (uno por avatar): hero, dolores, productos, testimonios, FAQ, campos del form.
- Un único layout reutilizable + componentes de sección.
- Rutas: `/clients/a1-socio-crecimiento`, `/clients/a2-dr-resultados`, etc.
- Imágenes y testimonios: placeholders por ahora.