'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-gradient-to-br from-accent/10 to-surface2 border border-accent/20 rounded-2xl p-8 text-center">
      <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-6 h-6 text-accent" />
      </div>
      <h2 className="text-xl font-bold text-white mb-2">
        Dagelijks crypto nieuws in je inbox
      </h2>
      <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
        Ontvang elke ochtend een overzicht van het belangrijkste crypto nieuws. Gratis, geen spam.
      </p>

      {status === 'success' ? (
        <div className="flex items-center justify-center gap-2 text-up">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Bedankt! Je bent aangemeld.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            required
            className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {status === 'loading' ? 'Even geduld...' : (
              <>Aanmelden <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-down text-xs mt-2">Er ging iets mis. Probeer het opnieuw.</p>
      )}
    </section>
  )
}
