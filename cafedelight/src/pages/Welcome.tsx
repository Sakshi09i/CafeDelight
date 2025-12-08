import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream via-white to-coffee-100">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-rosevale/15 to-transparent pointer-events-none" />
      <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-coffee-200/40 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-coffee-400/20 blur-3xl" />

      <div className="relative z-10 container-px mx-auto flex flex-col gap-14 py-16 md:grid md:grid-cols-2 md:items-center">
        <div className="space-y-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-sm text-rosevale shadow-sm"
          >
            Freshly brewed moments • Since 2015
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl leading-tight font-display text-coffee-900 sm:text-5xl"
          >
            Sip, relax, and feel at home at Café Delight
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-coffee-700 max-w-prose"
          >
            Start your day with artisanal coffee, unwind with soulful chai, or treat yourself to a bite of happiness. Continue to explore our immersive experience and plan your visit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={() => navigate('/login')} className="btn-primary px-6 py-3 text-base font-semibold shadow-lg shadow-rosevale/30">
              Login
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid gap-6 sm:grid-cols-3"
          >
            {[
              { label: 'Daily visitors', value: '500+' },
              { label: 'Signature drinks', value: '40+' },
              { label: 'Years crafting joy', value: '10' },
            ].map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-rosevale">{stat.value}</div>
                <div className="text-sm text-coffee-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop"
            alt="Café ambiance"
            className="w-full rounded-[32px] border border-white/40 object-cover shadow-2xl"
          />
          <div className="glass-panel absolute -bottom-6 right-6 w-60 rounded-2xl border-white/70 p-5 shadow-xl">
            <p className="text-sm uppercase tracking-wide text-coffee-500">Open today</p>
            <p className="text-xl font-semibold text-coffee-900">7:00 AM – 10:00 PM</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-coffee-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Walk-ins welcome
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
