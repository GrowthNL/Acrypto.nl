import { neon } from '@neondatabase/serverless'

export const DB_READY = !!process.env.DATABASE_URL

export function getDb() {
  return neon(process.env.DATABASE_URL!)
}
