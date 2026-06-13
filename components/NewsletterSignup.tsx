'use client'

import { useState } from 'react'
import { Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'

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
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-violet-700 rounded-3xl p-8 md:p-12 text-center">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative">
        <div className="inline-flex items-center gap-1.5 bg-white/15 text-white/90 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          Gratis nieuwsbrief
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Dagelijks crypto nieuws in je inbox
        </h2>
        <p className="text-primary-200 text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
          Ontvang elke ochtend de belangrijkste crypto ontwikkelingen. Bitcoin, Ethereum, altcoins,
          regelgeving en marktcontext in normaal Nederlands. Gratis, en je kunt je altijd uitschrijven.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-2xl font-semibold">
            <CheckCircle className="w-5 h-5" />
            Gelukt! Je bent aangemeld.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
              className="flex-1 px-4 py-3 bg-white/15 border border-white/25 hover:border-white/40 rounded-xl text-sm text-white placeholder-primary-200 focus:outline-none focus:border-white/60 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-white text-primary-700 text-sm font-bold rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
            >
              {status === 'loading' ? 'Moment...' : <><span>Aanmelden</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-red-300 text-xs mt-3">Er ging iets mis. Probeer het opnieuw.</p>
        )}
      </div>
    </section>
  )
}
