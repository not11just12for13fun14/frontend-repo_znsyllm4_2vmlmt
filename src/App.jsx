import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Studio from './components/Studio'
import AuthModal from './components/AuthModal'

function App() {
  const [authOpen, setAuthOpen] = useState(false)
  const [token, setToken] = useState('')

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setToken(t)
  }, [])

  const openAuth = () => setAuthOpen(true)
  const closeAuth = () => setAuthOpen(false)
  const onAuthed = (t) => setToken(t)

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      <Navbar onOpenAuth={openAuth} />
      <main className="max-w-7xl mx-auto px-6">
        <Hero />
        <section id="features" className="py-16 grid lg:grid-cols-3 gap-6">
          {[{
            title:'Text → 3D', desc:'Describe your idea and instantly preview a 3D scene.'
          },{
            title:'Image → 3D', desc:'Upload a reference image to convert into a 3D preview.'
          },{
            title:'History', desc:'Your generations are saved to your account.'
          }].map((f,i)=> (
            <div key={i} className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-xl p-6">
              <div className="text-lg font-medium text-white/90">{f.title}</div>
              <div className="text-sm text-white/70 mt-2">{f.desc}</div>
            </div>
          ))}
        </section>
        <Studio token={token} />
      </main>
      <AuthModal open={authOpen || !token} onClose={closeAuth} onAuthed={onAuthed} />
    </div>
  )
}

export default App
