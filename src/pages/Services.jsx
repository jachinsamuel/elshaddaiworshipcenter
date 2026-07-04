import { motion } from 'framer-motion'
import { Clock3 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import TiltCard from '../components/TiltCard'
import { SCHEDULE } from '../lib/schedule'
import pageHeaders from '../content/page-headers.json'

export default function Services() {

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Services" description="Our full weekly worship schedule. Sunday services, Friday fasting prayer, and Saturday night worship at El Shaddai Worship Center, Nagercoil." />
      <PageHeader eyebrow="WEEKLY RHYTHM" title="Services" image={pageHeaders.services} />

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            Find Your Time to Gather
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {SCHEDULE.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-full h-full"
            >
              <TiltCard className="group relative rounded-2xl overflow-hidden shadow-sm aspect-[5/4] bg-stone-200 cursor-default h-full">
                <FallbackImage
                  src={s.image}
                  alt={s.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)]/90 via-[var(--color-ink)]/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-xs font-semibold tracking-widest text-white/70 mb-1">
                    {s.dayLabel.toUpperCase()}
                  </p>
                  <h3 className="font-serif text-2xl text-white mb-1.5">{s.title}</h3>
                  {s.note && <p className="text-sm text-white/75 mb-2">{s.note}</p>}
                  <div className="flex items-center gap-2 text-white font-display font-medium text-sm">
                    <Clock3 size={16} className="text-white/70" />
                    {s.timeLabel}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
