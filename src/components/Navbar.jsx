import { useEffect, useState } from 'react'
import { Menu, LogIn, User, Clock } from 'lucide-react'

export default function Navbar({ onOpenAuth }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'backdrop-blur-xl bg-black/40 ring-1 ring-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-blue-400 to-purple-500" />
          <span className="text-white font-semibold tracking-tight">Nova3D</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-white/70">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#studio" className="hover:text-white">Studio</a>
          <a href="#history" className="hover:text-white flex items-center gap-2"><Clock size={16}/>History</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onOpenAuth} className="inline-flex items-center gap-2 text-sm text-white bg-white/10 hover:bg-white/20 ring-1 ring-white/20 px-3 py-1.5 rounded-lg">
            <LogIn size={16}/> Sign in
          </button>
          <button className="sm:hidden text-white/80"><Menu/></button>
        </div>
      </div>
    </header>
  )
}
