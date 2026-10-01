// Single source of truth for business identity. Import from here — never
// hardcode business data in components.
import logoAsset from "@/assets/brand/logo.webp"
// TODO(replace): GOOGLE_MAPS coordinates/placeId and BUSINESS_HOURS below
// are still placeholders — canonical/JSON-LD geo + hours stay semi-fictional
// until they land. Phones, email and address are the verified legal identity
// (GRUPO HOCLIVA SAS, see src/data/privacy-notice.md).
export const PHONES = {
  main: {
    raw: "+529222231006",
    formatted: "922 223 1006",
    href: "tel:+529222231006",
    wa: "https://wa.me/529222231006",
  },
} as const

export const EMAIL = {
  address: "grupohocliva@gmail.com",
  href: "mailto:grupohocliva@gmail.com",
} as const

export const ADDRESS = {
  full: "Calle 17, Lote 1 Manzana 14, Col. Petrolera, Minatitlán, Veracruz, C.P. 96850",
  street: "Calle 17, Lote 1 Manzana 14",
  zone: "Col. Petrolera",
  city: "Minatitlán",
  state: "Veracruz",
  postalCode: "96850",
  country: "México",
  countryCode: "MX",
} as const

export const GOOGLE_MAPS = {
  placeId: "...",
  coordinates: { lat: 0.0, lng: 0.0 },
} as const

export const BUSINESS_HOURS = {
  start: "09:00",
  end: "17:00",
  timezone: "America/New_York",
  display: "9:00 AM to 5:00 PM",
} as const

export const BUSINESS_DATA = {
  name: "Vetoxzyn",
  legalName: "GRUPO HOCLIVA SAS",
  // Server-read origin chain (all importers are server-rendered .astro
  // frontmatter): per-checkout PORTLESS_URL wins in dev, explicit SITE_URL
  // covers builds, prod host is the fallback. Future client islands must
  // receive the origin via props — never import.meta.env.
  url: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://vetoxzyncomercial.mx",
  logo: logoAsset,
  ogImage: "/og-image.jpg",
  contact: {
    phone: PHONES.main.formatted,
    email: EMAIL.address,
    address: {
      street: ADDRESS.street,
      city: ADDRESS.city,
      region: ADDRESS.state,
      postalCode: ADDRESS.postalCode,
      country: ADDRESS.countryCode,
    },
    geo: GOOGLE_MAPS.coordinates,
  },
} as const
