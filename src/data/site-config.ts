// Single source of truth for business identity. Import from here — never
// hardcode business data in components.
// TODO(replace): domain + email are set; phone, address, socials, maps and
// hours below are still placeholders — canonical/JSON-LD contact block stays
// semi-fictional until they land.
export const PHONES = {
  main: {
    raw: "+12345678901",
    formatted: "+1 (234) 567-8901",
    href: "tel:+12345678901",
  },
} as const

export const EMAIL = {
  address: "info@vetoxzyncomercial.mx",
  href: "mailto:info@vetoxzyncomercial.mx",
} as const

export const ADDRESS = {
  full: "123 Main St, Downtown, 12345 City, ST",
  street: "123 Main St",
  zone: "Downtown",
  city: "City",
  state: "State",
  postalCode: "12345",
  country: "Country",
  countryCode: "XX",
} as const

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/vetoxzyn",
  instagram: "https://www.instagram.com/vetoxzyn/",
} as const

export const GOOGLE_MAPS = {
  embedUrl: "https://www.google.com/maps/embed?pb=...",
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
  legalName: "Vetoxzyn",
  // Server-read origin chain (all importers are server-rendered .astro
  // frontmatter): per-checkout PORTLESS_URL wins in dev, explicit SITE_URL
  // covers builds, prod host is the fallback. Future client islands must
  // receive the origin via props — never import.meta.env.
  url: process.env.PORTLESS_URL ?? process.env.SITE_URL ?? "https://vetoxzyncomercial.mx",
  logo: "/brand/logo.webp",
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
  social: SOCIAL_LINKS,
} as const
