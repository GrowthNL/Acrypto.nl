import { NextRequest, NextResponse } from 'next/server'
import { createServiceSupabaseClient } from '@/lib/supabase-server'
import { fetchAllSources } from '@/lib/rss'
import { generateDutchArticle } from '@/lib/claude'
import { slugify } from '@/lib/utils'

export const maxDuration = 300 // 5 min max for Vercel Pro

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  // Allow Vercel cron (no auth needed) or manual trigger with secret
  const isVercelCron = req.headers.get('x-vercel-cron') === '1'
  const isAuthorized = isVercelCron || (cronSecret && authHeader === `Bearer ${cronSecret}`)

  if (!isAuthorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createServiceSupabaseClient()
  const results = { fetched: 0, new: 0, published: 0, errors: 0 }

  try {
    const items = await fetchAllSources()
    results.fetched = items.length

    for (const item of items) {
      // Check if already scraped
      const { data: existing } = await supabase
        .from('scraped_urls')
        .select('id')
        .eq('url', item.link)
        .single()

      if (existing) continue
      results.new++

      // Generate Dutch article with Claude
      const generated = await generateDutchArticle(
        item.title,
        item.content,
        item.source.name
      )

      if (!generated) {
        results.errors++
        // Still mark as scraped to avoid retrying
        await supabase.from('scraped_urls').insert({ url: item.link })
        continue
      }

      // Ensure unique slug
      let slug = generated.slug || slugify(generated.title)
      const { data: slugExists } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', slug)
        .single()

      if (slugExists) {
        slug = `${slug}-${Date.now()}`
      }

      // Insert article
      const { error: insertError } = await supabase.from('articles').insert({
        title: generated.title,
        slug,
        excerpt: generated.excerpt,
        content: generated.content,
        image_url: item.imageUrl,
        source_url: item.link,
        source_name: item.source.name,
        author_name: 'Acrypto Redactie',
        category: generated.category || 'nieuws',
        tags: generated.tags || [],
        status: 'published',
        featured: false,
        published_at: new Date(item.pubDate).toISOString(),
      })

      if (insertError) {
        results.errors++
        console.error('Insert error:', insertError)
      } else {
        results.published++
      }

      // Mark as scraped
      await supabase.from('scraped_urls').insert({ url: item.link })

      // Avoid rate limiting Claude API
      await new Promise(r => setTimeout(r, 1500))
    }

    return NextResponse.json({ success: true, ...results })
  } catch (err) {
    console.error('Scrape error:', err)
    return NextResponse.json({ error: 'Scrape failed', ...results }, { status: 500 })
  }
}
