import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black to-transparent opacity-60" />
      <div className="relative grid lg:grid-cols-2 gap-10 items-center pt-20 pb-10">
        <div className="px-6 lg:px-10">
          <div className="inline-flex items-center gap-2 text-xs tracking-wide text-cyan-300/80 bg-cyan-950/40 ring-1 ring-cyan-500/30 rounded-full px-3 py-1 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            NEXT-GEN 3D GENERATION
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
            Text & Image → 3D
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">in seconds</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl">
            Type a prompt or upload a reference image and instantly preview an interactive 3D scene. Minimal, fast, and futuristic.
          </p>
        </div>
        <div className="relative h-[420px] sm:h-[520px] lg:h-[640px]">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
            <Spline scene="https://prod.spline.design/VyGeZv58yuk8j7Yy/scene.splinecode" />
          </div>
          <div className="absolute -inset-6 -z-10 blur-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-purple-500/20" />
        </div>
      </div>
    </section>
  )
}
