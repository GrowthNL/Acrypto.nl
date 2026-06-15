'use client'

// Heropent de cookie-toestemmingsbanner zodat bezoekers hun keuze kunnen herzien.
export default function CookieSettingsButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
      className="text-primary-600 hover:underline font-medium"
    >
      Cookievoorkeuren wijzigen
    </button>
  )
}
