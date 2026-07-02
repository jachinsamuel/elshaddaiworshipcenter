import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import pageHeaders from '../content/page-headers.json'

// Each sermon is its own JSON file in src/content/sermons/, editable
// individually through the Decap CMS admin panel ("Add New Sermon").
// import.meta.glob picks up every file in that folder at build time.
const sermonModules = import.meta.glob('../content/sermons/*.json', { eager: true })
const SERMONS = Object.values(sermonModules)
  .map((m) => m.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function Sermons() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Sermons & Media" description="Watch recent sermons and messages from El Shaddai Worship Center, Nagercoil, with scripture references and speaker details." />
      <PageHeader eyebrow="WATCH & LISTEN" title="Sermons & Media" image={pageHeaders.sermons} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
            WATCH &amp; LISTEN
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            Recent Messages
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-7">
          {SERMONS.map((s, i) => (
            <motion.a
              key={`${s.title}-${s.date}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="hover-lift group rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white block"
            >
              <div className="relative aspect-video bg-stone-200 overflow-hidden">
                <img
                  src={s.thumb}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                  <PlayCircle className="text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110" size={56} strokeWidth={1.4} />
                </div>
                <span className="absolute top-3 left-3 bg-[var(--color-brand-red)] text-white text-xs font-display font-semibold px-2.5 py-1 rounded-full">
                  {s.scripture}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold text-[var(--color-slate-deep)] mb-1.5">{s.title}</h3>
                <p className="text-sm text-stone-500">{s.speaker} &middot; {formatDate(s.date)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
