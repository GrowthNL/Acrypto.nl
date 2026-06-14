'use client'

import { useState } from 'react'
import { Mail, TrendingUp, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'

type FormType = 'algemeen' | 'adverteren'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
  type: FormType
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', subject: '', message: '', type: 'algemeen',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof FormState, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json() as { success?: boolean; error?: string }
      if (!res.ok) {
        setErrorMsg(data.error || 'Onbekende fout.')
        setStatus('error')
      } else {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '', type: 'algemeen' })
      }
    } catch {
      setErrorMsg('Verbindingsfout. Controleer je internet en probeer opnieuw.')
      setStatus('error')
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Contact</h1>
        <p className="text-slate-500 text-lg max-w-xl">
          Heb je een vraag, tip of wil je samenwerken? Stuur ons een bericht en we reageren zo snel mogelijk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

        {/* Form */}
        <div className="bg-white border border-slate-100 rounded-2xl shadow-card p-6 sm:p-8">

          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
              <CheckCircle className="w-14 h-14 text-emerald-500" />
              <h2 className="text-xl font-bold text-slate-900">Bericht verzonden!</h2>
              <p className="text-slate-500 max-w-sm">
                Bedankt voor je bericht. We nemen zo snel mogelijk contact met je op.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-5 py-2 text-sm font-semibold bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
              >
                Nieuw bericht
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Type tabs */}
              <div className="flex rounded-xl border border-slate-200 overflow-hidden">
                {([
                  { value: 'algemeen',   label: 'Algemeen contact', icon: MessageSquare },
                  { value: 'adverteren', label: 'Adverteren',        icon: TrendingUp   },
                ] as const).map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set('type', value)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                      form.type === value
                        ? 'bg-primary-600 text-white'
                        : 'text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {form.type === 'adverteren' && (
                <div className="p-3 bg-primary-50 border border-primary-100 rounded-xl text-sm text-primary-700">
                  Acrypto.nl bereikt dagelijks duizenden Nederlandse crypto-enthousiasten. Vermeld je budget en gewenste format en we sturen je een voorstel.
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Naam *</label>
                  <input
                    required value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="Je naam"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">E-mailadres *</label>
                  <input
                    required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="jouw@email.nl"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Onderwerp *</label>
                <input
                  required value={form.subject} onChange={e => set('subject', e.target.value)}
                  placeholder={form.type === 'adverteren' ? 'Bijv. banneradvertentie of gesponsorde content' : 'Waar gaat je bericht over?'}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Bericht *</label>
                <textarea
                  required rows={6} value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder={form.type === 'adverteren'
                    ? 'Beschrijf je merk, doelgroep, gewenste format en (indien bekend) budget...'
                    : 'Schrijf hier je bericht...'}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3 text-sm font-semibold bg-gradient-to-r from-primary-600 to-violet-600 hover:from-primary-700 hover:to-violet-700 text-white rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Verzenden...' : 'Bericht verzenden'}
              </button>
            </form>
          )}
        </div>

        {/* Info sidebar */}
        <div className="space-y-5">

          <div className="bg-white border border-slate-100 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary-600" />
              </div>
              <h3 className="font-bold text-slate-900">Reactietijd</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              We streven ernaar binnen <strong>1-2 werkdagen</strong> te reageren op alle berichten.
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-2xl shadow-card p-5">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-900">Adverteren</h3>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              Bereik duizenden Nederlandse crypto-beleggers via Acrypto.nl. Wij bieden:
            </p>
            <ul className="space-y-1.5 text-sm text-slate-500">
              {['Banneradvertenties', 'Gesponsorde artikelen', 'Nieuwsbrief-sponsoring', 'Native content'].map(item => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
            <p className="text-xs font-bold text-amber-700 mb-1">Redactioneel beleid</p>
            <p className="text-sm text-amber-700 leading-relaxed">
              Gesponsorde content wordt altijd duidelijk gelabeld. Wij publiceren geen misleidende of schadelijke financiele informatie.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
