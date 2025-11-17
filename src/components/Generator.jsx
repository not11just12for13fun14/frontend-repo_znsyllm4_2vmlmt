import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Generator({ user, onRequireAuth }) {
  const [kind, setKind] = useState('text')
  const [prompt, setPrompt] = useState('futuristic drone with neon accents, minimalist design')
  const [imageB64, setImageB64] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resultUrl, setResultUrl] = useState(null)
  const [error, setError] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onFile = (file) => {
    const reader = new FileReader()
    reader.onload = () => setImageB64(reader.result.split(',')[1])
    reader.readAsDataURL(file)
  }

  const submit = async () => {
    if (!user) return onRequireAuth()
    setLoading(true)
    setError(null)
    setResultUrl(null)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${backend}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ kind, prompt: kind==='text'?prompt:undefined, image_b64: kind==='image'?imageB64:undefined })
      })
      if (!res.ok) throw new Error('Generation failed')
      const data = await res.json()
      setResultUrl(data.result_url)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="generator" className="relative py-20 bg-[#0a0a0f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-white/60">
                <button onClick={()=>setKind('text')} className={`px-3 py-1 rounded-full border ${kind==='text'? 'bg-white text-black border-white':'border-white/20 bg-white/5'}`}>Text</button>
                <button onClick={()=>setKind('image')} className={`px-3 py-1 rounded-full border ${kind==='image'? 'bg-white text-black border-white':'border-white/20 bg-white/5'}`}>Image</button>
              </div>

              {kind==='text' ? (
                <div className="mt-4">
                  <label className="text-sm text-white/70">Describe your idea</label>
                  <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5} className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 p-3 outline-none focus:ring-2 ring-white/20" />
                </div>
              ) : (
                <div className="mt-4">
                  <label className="text-sm text-white/70">Upload a reference image</label>
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={e=> onFile(e.target.files[0])} className="block w-full text-sm text-white/70" />
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <button disabled={loading} onClick={submit} className="px-5 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-white/90 transition disabled:opacity-60">{loading? 'Generating…' : 'Generate 3D'}</button>
                {error && <span className="text-red-400 text-sm">{error}</span>}
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-black/30 border-t lg:border-l border-white/10 min-h-[320px]">
              {!resultUrl ? (
                <div className="h-full grid place-items-center text-white/60 text-sm">Your 3D result will appear here</div>
              ) : (
                <motion.iframe initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} src={resultUrl} className="w-full h-[420px] rounded-xl border border-white/10" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
