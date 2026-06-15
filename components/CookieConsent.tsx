'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'acrypto-consent'
const CLARITY_ID = 'x7kufp1uch'

// Laadt Microsoft Clarity pas na expliciete toestemming. Idempotent: laadt
// het script maar een keer, ook als de functie vaker wordt aangeroepen.
function loadClarity() {
  if (typeof window === 'undefined') return
  if ((window as unknown as { clarity?: unknown }).clarity) return
  ;(function (c: any, l: Document, a: string, r: string, i: string) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) }
    const t = l.createElement(r) as HTMLScriptElement
    t.async = true
    t.src = 'https://www.clarity.ms/tag/' + i
    const y = l.getElementsByTagName(r)[0]
    y.parentNode?.insertBefore(t, y)
  })(window, document, 'clarity', 'script', CLARITY_ID)
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (stored === 'accepted') {
      loadClarity()
    } else if (stored !== 'rejected') {
      setVisible(true)
    }

    // Laat bezoekers hun keuze later herzien (bijv. vanaf de privacypagina).
    const open = () => setVisible(true)
    window.addEventListener('open-cookie-settings', open)
    return () => window.removeEventListener('open-cookie-settings', open)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
    loadClarity()
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookietoestemming"
      className="fixed inset-x-0 bottom-0 z-[90] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-xl p-5 sm:p-6">
        <h2 className="text-base font-bold text-slate-900 mb-1">Cookies &amp; privacy</h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          Wij gebruiken analytische cookies van Microsoft Clarity om te begrijpen hoe bezoekers de
          site gebruiken, zodat we Acrypto.nl kunnen verbeteren. Deze plaatsen we alleen met jouw
          toestemming. Meer hierover lees je in ons{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline font-medium">privacybeleid</Link>.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
          <button
            onClick={reject}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Weigeren
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
          >
            Accepteren
          </button>
        </div>
      </div>
    </div>
  )
}
