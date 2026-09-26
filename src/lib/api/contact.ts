import { safeFetch } from "./client"
import type { ContactFormResponse } from "./types"
import type { ContactValues } from "@/store/contact"

const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT
const user = import.meta.env.PUBLIC_CONTACT_FORM_USER
const apiKey = import.meta.env.PUBLIC_CONTACT_FORM_API_KEY

function requireConfig(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing ${name} configuration`)
  }

  return value
}

export function submitContactForm(values: ContactValues, domain: string) {
  return safeFetch<ContactFormResponse>(requireConfig(endpoint, "contact form endpoint"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: requireConfig(apiKey, "contact form API key"),
      user: requireConfig(user, "contact form user"),
      domain,
      ...values,
    }),
  })
}
