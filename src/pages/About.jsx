import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import HeadPastorGallery from '../components/HeadPastorGallery'
import Seo from '../components/Seo'
import aboutContent from '../content/about-content.json'
import leadersData from '../content/leaders.json'
import pageHeaders from '../content/page-headers.json'

export default function About() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="About Us" description="Forty years of grace in Nagercoil. Meet the founder and leadership of El Shaddai Worship Center, and discover the apostolic truth we stand on." />
      <PageHeader eyebrow="FORTY YEARS OF GRACE" title="About Us" image={pageHeaders.about} />

      {/* Huge opening statement — the church's identity in one big serif
          sentence, before any of the founding story or leadership detail. */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 pt-24 pb-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-[var(--color-ink)]"
        >
          {aboutContent.opening_statement}
        </motion.p>
      </section>

      {/* About section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div className="relative order-2 md:order-1 mb-8">
          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100">
            <FallbackImage src={aboutContent.sanctuary_image} alt="El Shaddai Worship Center sanctuary interior" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-[var(--color-slate-deep)] text-white px-6 py-4 rounded-xl shadow-xl max-w-[220px]">
            <p className="font-display text-2xl font-bold leading-none">40+</p>
            <p className="text-xs text-white/70 mt-1 leading-snug">Years of Grace &amp; Ministry</p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
            OUR STORY
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)] mb-6">
            Rooted in Faith, Built for Generations
          </h2>
          <p className="text-stone-600 leading-relaxed mb-4">
            {aboutContent.story_paragraph_1}
          </p>
          <p className="text-stone-600 leading-relaxed">
            {aboutContent.story_paragraph_2}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-9 pt-7 border-t border-stone-200">
            <div>
              <p className="font-display text-xs font-semibold tracking-widest text-stone-400 mb-1.5">FOUNDED</p>
              <p className="font-serif text-lg text-[var(--color-ink)]">{aboutContent.founded_year_text}</p>
            </div>
            <div>
              <p className="font-display text-xs font-semibold tracking-widest text-stone-400 mb-1.5">LOCATION</p>
              <p className="font-serif text-lg text-[var(--color-ink)]">{aboutContent.location_text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership — full-width alternating rows (image/text swap sides
          each row) rather than matching cards, so each leader gets real
          space instead of competing for the same compact box. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
            SPIRITUAL LEADERSHIP
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            The Shepherds of Our House
          </h2>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {/* Founder — text left, image right */}
          <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 md:order-1"
            >
              <p className="font-display text-xs font-semibold tracking-widest text-[var(--color-gold)] mb-2">
                {leadersData.founder.role.toUpperCase()}
              </p>
              <h3 className="font-serif text-3xl text-[var(--color-ink)] mb-4">
                {leadersData.founder.name}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                {leadersData.founder.bio_intro}
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                {leadersData.founder.bio_legacy}
              </p>
              <div className="border-l-2 border-[var(--color-gold)] pl-5">
                <Quote size={22} className="text-[var(--color-gold)] mb-2" />
                <p className="font-serif italic text-xl text-[var(--color-ink)] leading-snug">
                  {leadersData.founder.quote}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="order-1 md:order-2"
            >
              <div className="hover-lift group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100">
                <FallbackImage
                  src={leadersData.founder.image}
                  alt={leadersData.founder.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>

          {/* Head Pastor — image left, text right */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
            <HeadPastorGallery leader={leadersData.head_pastor} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="order-2"
            >
              <p className="font-display text-xs font-semibold tracking-widest text-[var(--color-royal)] mb-2">
                {leadersData.head_pastor.role.toUpperCase()}
              </p>
              <h3 className="font-serif text-3xl text-[var(--color-ink)] mb-4">
                {leadersData.head_pastor.name}
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                {leadersData.head_pastor.bio_intro}
              </p>
              <p className="text-stone-600 leading-relaxed mb-6">
                {leadersData.head_pastor.bio_family}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
