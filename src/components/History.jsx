import { useEffect, useState } from 'react'

export default function History({ user, onRequireAuth }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const load = async () => {
    if (!user) return onRequireAuth()
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${backend}/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to load history')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <section id="history" className="relative py-20 bg-[#0a0a0f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Your generations</h2>
            <p className="text-white/60">A record of everything you have created.</p>
          </div>
          <button onClick={load} className="px-3 py-2 rounded-lg bg-white/10 border border-white/15 hover:bg-white/15 text-sm">Refresh</button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading && <div className="text-white/60">Loading…</div>}
          {!loading && items.length === 0 && <div className="text-white/60">No generations yet.</div>}
          {items.map((it) => (
            <a key={it.id} href={it.result_url} target="_blank" className="block rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition">
              <div className="aspect-video bg-black/40 grid place-items-center text-white/50 text-sm">3D Scene</div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wide text-white/60">{it.kind}</div>
                {it.prompt && <div className="mt-1 text-sm line-clamp-2 text-white/80">{it.prompt}</div>}
                <div className="mt-2 text-xs text-white/50">{new Date(it.created_at).toLocaleString()}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
