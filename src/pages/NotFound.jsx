import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home as HomeIcon, Compass } from 'lucide-react'
import RidgeDivider from '../components/RidgeDivider'
import Seo from '../components/Seo'
import MagneticElement from '../components/MagneticElement'

export default function NotFound() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Page Not Found" description="This page doesn't exist. Head back to El Shaddai Worship Center's homepage." />
      {/* Mirrors the PageHeader treatment (ink background, ridge seam) so a
          wrong turn still feels like part of the same site, not a generic
          browser error screen. */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-[var(--color-ink)] overflow-hidden">
        <div className="grain absolute inset-0" />

        <div className="relative z-10 text-center px-6 max-w-lg mx-auto py-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-gold)] section-eyebrow mb-4"
          >
            LOST YOUR WAY?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-serif text-white text-6xl sm:text-7xl font-medium mb-4"
          >
            404
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-white/80 text-base leading-relaxed mb-10"
          >
            We couldn't find the page you were looking for. Let us help you find your way back home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticElement>
              <Link
                to="/"
                className="press group inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-red-700 hover:-translate-y-0.5 transition-all"
              >
                <HomeIcon size={17} /> Back to Home
              </Link>
            </MagneticElement>
            <MagneticElement>
              <Link
                to="/contact"
                className="press group inline-flex items-center gap-2 border border-white/30 text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              >
                <Compass size={17} /> Contact Us
              </Link>
            </MagneticElement>
          </motion.div>
        </div>

        <RidgeDivider color="var(--color-parchment)" peakUp />
      </section>
    </motion.div>
  )
}
