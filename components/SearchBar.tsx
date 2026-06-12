'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { useTransition, useState, useEffect } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    setValue(searchParams.get('q') || '')
  }, [searchParams])

  function submit(val: string) {
    const params = new URLSearchParams()
    if (val.trim()) params.set('q', val.trim())
    startTransition(() => {
      router.push(`/nieuws${val.trim() ? `?${params}` : ''}`)
    })
  }

  return (
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit(value)}
        placeholder="Zoek artikelen..."
        className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 bg-white placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={() => { setValue(''); submit('') }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label="Zoekterm wissen"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
