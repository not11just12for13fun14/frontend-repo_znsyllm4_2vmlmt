import { Zap, Layers, Clock, Lock } from 'lucide-react'

export default function Features() {
  const items = [
    { icon: <Zap className="text-blue-400" />, title: 'Lightning fast', desc: 'Optimized pipeline returns interactive scenes in seconds.' },
    { icon: <Layers className="text-purple-400" />, title: 'Multi‑modal', desc: 'Generate from plain text prompts or reference images.' },
    { icon: <Clock className="text-cyan-400" />, title: 'Saved history', desc: 'Every generation is saved to your account for later.' },
    { icon: <Lock className="text-emerald-400" />, title: 'Secure', desc: 'Account-based access with token auth keeps data private.' },
  ]
  return (
    <section id="features" className="relative py-20 bg-[#0a0a0f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">Designed for creators</h2>
        <p className="text-white/60 mt-2 max-w-2xl">A minimal surface with a powerful engine. Compose ideas into interactive 3D that looks futuristic yet clean.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {items.map((it, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-white/5 border border-white/10">{it.icon}</div>
              <h3 className="mt-4 font-semibold">{it.title}</h3>
              <p className="text-white/60 text-sm mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
