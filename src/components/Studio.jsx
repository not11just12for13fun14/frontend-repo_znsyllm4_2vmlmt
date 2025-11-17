import { useEffect, useMemo, useState } from 'react'

export default function Studio({ token }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [tab, setTab] = useState('text')
  const [prompt, setPrompt] = useState('A sleek, futuristic drone with neon lights')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState('')
  const [history, setHistory] = useState([])

  const headers = useMemo(() => ({
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  }), [token])

  const fetchHistory = async () => {
    if (!token) return
    try {
      const res = await fetch(`${baseUrl}/generations`, { headers })
      const data = await res.json()
      setHistory(data.items || [])
    } catch (e) { /* noop */ }
  }

  useEffect(() => { fetchHistory() }, [token])

  const generate = async () => {
    if (!token) return
    setLoading(true)
    setResultUrl('')
    try {
      const url = tab === 'text' ? `${baseUrl}/generate/text3d` : `${baseUrl}/generate/image3d`
      const body = tab === 'text' ? { prompt } : { image_url: imageUrl }
      const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) })
      const data = await res.json()
      setResultUrl(data.result_url)
      fetchHistory()
    } catch (e) {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="studio" className="py-16">
      <div className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('text')} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='text'?'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/30':'bg-white/10 text-white/70'}`}>Text → 3D</button>
          <button onClick={() => setTab('image')} className={`px-3 py-1.5 rounded-lg text-sm ${tab==='image'?'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/30':'bg-white/10 text-white/70'}`}>Image → 3D</button>
          <div className="ml-auto text-xs text-white/60">Logged in: {token ? 'Yes' : 'No'}</div>
        </div>

        {tab === 'text' ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm text-white/70 mb-2">Prompt</label>
              <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5} className="w-full bg-black/40 ring-1 ring-white/10 rounded-xl p-3 text-white placeholder-white/40" placeholder="Describe what you want in 3D..."/>
              <button onClick={generate} disabled={loading} className="mt-3 inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl py-2.5 disabled:opacity-60">
                {loading ? 'Generating…' : 'Generate'}
              </button>
            </div>
            <div className="md:col-span-2">
              <div className="aspect-video rounded-xl ring-1 ring-white/10 bg-black/40 overflow-hidden">
                {resultUrl ? (
                  <iframe title="result" src={resultUrl} className="w-full h-full" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-white/50">No preview yet</div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <label className="block text-sm text-white/70 mb-2">Image URL</label>
              <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} className="w-full bg-black/40 ring-1 ring-white/10 rounded-xl p-3 text-white placeholder-white/40" placeholder="https://..."/>
              <button onClick={generate} disabled={loading} className="mt-3 inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl py-2.5 disabled:opacity-60">
                {loading ? 'Generating…' : 'Generate'}
              </button>
            </div>
            <div className="md:col-span-2">
              <div className="aspect-video rounded-xl ring-1 ring-white/10 bg-black/40 overflow-hidden">
                {resultUrl ? (
                  <iframe title="result" src={resultUrl} className="w-full h-full" />
                ) : (
                  <div className="h-full w-full grid place-items-center text-white/50">No preview yet</div>
                )}
              </div>
            </div>
          </div>
        )}

        <div id="history" className="mt-10">
          <h3 className="text-white/90 font-medium mb-3">Your history</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((h) => (
              <a key={h.id} href={h.result_url} target="_blank" className="group rounded-xl ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition p-3">
                <div className="text-xs text-white/60 mb-1">{new Date(h.created_at).toLocaleString()}</div>
                <div className="flex items-center justify-between">
                  <div className="text-white/80 text-sm">{h.kind === 'text3d' ? (h.prompt?.slice(0,60)||'Text') : 'Image → 3D'}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full ${h.status==='completed'?'bg-emerald-400/20 text-emerald-200':'bg-yellow-400/20 text-yellow-200'}`}>{h.status}</div>
                </div>
              </a>
            ))}
            {history.length===0 && <div className="text-white/50 text-sm">No generations yet.</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
