# Proposal

## Why

Las imágenes de las presentaciones no indican de forma inmediata su volumen. Un cintillo visible en cada tarjeta permite identificar cada atomizador y garrafa sin depender de leer la etiqueta del envase.

## What Changes

- Añadir un cintillo decorativo de presentación a cada tarjeta de la galería de Productos.
- Derivar el volumen desde el nombre del archivo para cubrir atomizadores y garrafas sin mantener una lista manual.
- Mantener el nombre de cada imagen como la fuente accesible; el cintillo no duplica anuncios en lectores de pantalla.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `product-gallery`: cada slide muestra un cintillo de volumen derivado del nombre de su archivo.

## Impact

- Afecta `src/components/organisms/Products.astro` y `src/components/molecules/ProductGallery.tsx`.
- Actualiza `openspec/specs/product-gallery/spec.md` y `docs/component-dependencies.md`.
- No agrega dependencias, rutas ni tokens de color.
