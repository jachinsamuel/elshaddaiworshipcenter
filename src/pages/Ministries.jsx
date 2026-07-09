import { motion } from 'framer-motion'

import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import TiltCard from '../components/TiltCard'
import FallbackImage from '../components/FallbackImage'
import ministriesData from '../content/ministries.json'
import pageHeaders from '../content/page-headers.json'

const MINISTRIES = ministriesData.ministries

export default function Ministries() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Ministries" description="Youth Fellowship, Sunday School, and Women's Ministry. Find your place to grow and serve at El Shaddai Worship Center." />
      <PageHeader eyebrow="GET INVOLVED" title="Ministries" image={pageHeaders.ministries} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            A Place for Every Season
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-7">
          {MINISTRIES.map(({ id, title, description, image, cta_text, cta_link, timing }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-full h-full"
            >
              <TiltCard className="group rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white cursor-default h-full">
                <div className="aspect-[5/4] bg-stone-100 overflow-hidden relative">
                  <FallbackImage
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-bold text-[var(--color-slate-deep)] mb-1">{title}</h3>
                  {timing && (
                    <p className="text-xs font-display font-semibold uppercase tracking-wider text-[var(--color-gold)] mb-3">
                      {timing}
                    </p>
                  )}
                  <p className="text-sm text-stone-500 leading-relaxed mb-4">{description}</p>
                  
                  {cta_link ? (
                    <a
                      href={cta_link}
                      target={cta_link.startsWith('http') ? '_blank' : undefined}
                      rel={cta_link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="press inline-flex items-center gap-1 font-display text-sm font-bold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors w-fit"
                    >
                      {cta_text || 'Learn More'} &rarr;
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 font-display text-sm font-semibold text-stone-400 cursor-default w-fit">
                      {cta_text || 'Coming Soon'}
                    </span>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
