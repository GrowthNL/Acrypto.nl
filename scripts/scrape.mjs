#!/usr/bin/env node
/**
 * Standalone scrape script : can be run locally or in CI
 * Usage: CRON_SECRET=xxx SITE_URL=https://acrypto.nl node scripts/scrape.mjs
 */

const siteUrl = process.env.SITE_URL || 'http://localhost:3000'
const secret = process.env.CRON_SECRET || ''

async function main() {
  console.log(`[scrape] Triggering scrape at ${siteUrl}/api/scrape`)

  const res = await fetch(`${siteUrl}/api/scrape`, {
    headers: {
      Authorization: `Bearer ${secret}`,
    },
  })

  const body = await res.json()
  console.log(`[scrape] Status: ${res.status}`)
  console.log('[scrape] Result:', JSON.stringify(body, null, 2))

  if (!res.ok) {
    process.exit(1)
  }
}

main().catch(err => {
  console.error('[scrape] Error:', err)
  process.exit(1)
})
