import { motion } from 'framer-motion'
import RidgeDivider from './RidgeDivider'

export default function PageHeader({ eyebrow, title, image }) {
  return (
    <div className="relative h-[42vh] min-h-[280px] w-full bg-[var(--color-slate-deep)]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(21,17,12,0.55), rgba(21,17,12,0.55)), url(${image})`,
        }}
      />
      <div className="relative h-full flex flex-col items-center justify-center px-6 text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-gold)] section-eyebrow mb-3"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-serif text-4xl md:text-6xl font-medium text-white tracking-tight"
        >
          {title}
        </motion.h1>
      </div>
      {/* Mountain-ridge signature edge — repeats on every subpage header */}
      <RidgeDivider color="var(--color-parchment)" peakUp />
    </div>
  )
}
