-- ============================================================
-- Acrypto.nl -- Neon Postgres Schema
-- Run this in the Neon SQL Editor after creating your database
-- ============================================================

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  image_alt TEXT,
  source_url TEXT,
  source_name TEXT,
  author_name TEXT DEFAULT 'Acrypto Redactie',
  category TEXT NOT NULL DEFAULT 'nieuws',
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS articles_slug_idx       ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_category_idx   ON articles(category);
CREATE INDEX IF NOT EXISTS articles_status_idx     ON articles(status);
CREATE INDEX IF NOT EXISTS articles_published_idx  ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS articles_featured_idx   ON articles(featured) WHERE featured = true;

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Crypto Prices
CREATE TABLE IF NOT EXISTS crypto_prices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coin_id TEXT UNIQUE NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT NOT NULL,
  image TEXT,
  current_price_eur DECIMAL(20,8),
  current_price_usd DECIMAL(20,8),
  market_cap_eur DECIMAL(20,2),
  volume_24h_eur DECIMAL(20,2),
  price_change_24h DECIMAL(20,8),
  price_change_percentage_24h DECIMAL(10,4),
  market_cap_rank INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge Base
CREATE TABLE IF NOT EXISTS knowledge_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS kb_slug_idx      ON knowledge_articles(slug);
CREATE INDEX IF NOT EXISTS kb_category_idx  ON knowledge_articles(category);

-- Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  active BOOLEAN DEFAULT true
);

-- Scraped URLs (deduplication)
CREATE TABLE IF NOT EXISTS scraped_urls (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT UNIQUE NOT NULL,
  scraped_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-cleanup old scraped URLs (keep 90 days)
CREATE OR REPLACE FUNCTION cleanup_old_scraped_urls()
RETURNS void AS $$
BEGIN
  DELETE FROM scraped_urls WHERE scraped_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;
