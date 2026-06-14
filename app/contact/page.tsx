import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact | Acrypto.nl',
  description: 'Neem contact op met Acrypto.nl voor vragen, tips of advertentiemogelijkheden.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactForm />
}
