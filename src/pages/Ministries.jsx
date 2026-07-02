import { motion } from 'framer-motion'
import { Sprout, BookOpen, HeartHandshake, ArrowRight } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import ministriesData from '../content/ministries.json'
import pageHeaders from '../content/page-headers.json'

// Icon + accent color stay fixed per ministry (a visual choice, not
// something a content editor needs to change). Title, description, and
// image come from src/content/ministries.json, editable via the CMS.
const ICON_META = {
  youth: { icon: Sprout, color: 'text-[var(--color-brand-red)]' },
  'sunday-school': { icon: BookOpen, color: 'text-[var(--color-royal)]' },
  women: { icon: HeartHandshake, color: 'text-[var(--color-gold)]' },
}

const MINISTRIES = ministriesData.ministries.map((m) => ({
  ...m,
  icon: ICON_META[m.id]?.icon ?? Sprout,
  color: ICON_META[m.id]?.color ?? 'text-[var(--color-royal)]',
}))

export default function Ministries() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Ministries" description="Youth Fellowship, Sunday School, and Women's Ministry — find your place to grow and serve at El Shaddai Worship Center." />
      <PageHeader eyebrow="GET INVOLVED" title="Ministries" image={pageHeaders.ministries} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
            GET INVOLVED
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            A Place for Every Season
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {MINISTRIES.map(({ id, icon: Icon, title, description, image, color }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="hover-lift group rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white"
            >
              <div className="aspect-[5/4] bg-stone-100 overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <Icon className={`${color} mb-3 transition-transform duration-300 group-hover:scale-110`} size={26} strokeWidth={1.7} />
                <h3 className="font-display text-lg font-bold text-[var(--color-slate-deep)] mb-2">{title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed mb-4">{description}</p>
                <a
                  href="#"
                  className="link-underline inline-flex items-center gap-1.5 font-display text-sm font-semibold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors w-fit"
                >
                  Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
