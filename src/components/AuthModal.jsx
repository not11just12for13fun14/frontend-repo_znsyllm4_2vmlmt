import { useEffect, useState } from 'react'

export default function AuthModal({ open, onClose, onAuthed }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { if (!open) { setError('') } }, [open])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url = mode === 'login' ? `${baseUrl}/auth/login` : `${baseUrl}/auth/register`
      const body = mode === 'login' ? { email, password } : { name, email, password }
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed')
      localStorage.setItem('token', data.token)
      onAuthed(data.token)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6">
      <div className="w-full max-w-sm rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/90 font-medium">{mode==='login'?'Sign in':'Create account'}</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>
        <div className="flex gap-2 text-xs mb-4">
          <button onClick={() => setMode('login')} className={`px-3 py-1.5 rounded-lg ${mode==='login'?'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/30':'bg-white/10 text-white/70'}`}>Sign in</button>
          <button onClick={() => setMode('register')} className={`px-3 py-1.5 rounded-lg ${mode==='register'?'bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/30':'bg-white/10 text-white/70'}`}>Create</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          {mode==='register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full bg-black/40 ring-1 ring-white/10 rounded-xl p-3 text-white placeholder-white/40"/>
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full bg-black/40 ring-1 ring-white/10 rounded-xl p-3 text-white placeholder-white/40"/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full bg-black/40 ring-1 ring-white/10 rounded-xl p-3 text-white placeholder-white/40"/>
          {error && <div className="text-red-300 text-sm">{error}</div>}
          <button disabled={loading} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl py-2.5 disabled:opacity-60">{loading?'Please wait…':(mode==='login'?'Sign in':'Create account')}</button>
        </form>
      </div>
    </div>
  )
}
