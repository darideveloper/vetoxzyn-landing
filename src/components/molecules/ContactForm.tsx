import * as React from "react"
import { Button } from "@/components/atoms/Button"
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
        <p role="status">Thanks — your message was recorded. We will get back to you soon.</p>
        <p className="mt-4">
          <Button onClick={() => reset()}>Send another message</Button>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex max-w-lg flex-col gap-2">
      <Input field="name" label="Name" placeholder="e.g. Sarah" autoComplete="name" />
      <Input field="email" label="Email" type="email" placeholder="you@example.com" autoComplete="email" />
      <Textarea field="message" label="Message" placeholder="How can we help?" rows={5} />
      <div className="p-2">
        <Button type="submit">Send message</Button>
      </div>
    </form>
  )
}
