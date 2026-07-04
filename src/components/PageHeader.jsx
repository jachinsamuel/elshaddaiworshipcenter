import { motion } from 'framer-motion'
import RidgeDivider from './RidgeDivider'
import TextReveal from './TextReveal'

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
        {title && (
          <TextReveal
            text={title}
            as="h1"
            splitBy="words"
            staggerDelay={0.06}
            duration={0.6}
            className="font-serif text-4xl md:text-6xl font-medium text-white tracking-tight flex flex-wrap justify-center"
          />
        )}
      </div>
      {/* Mountain-ridge signature edge — repeats on every subpage header */}
      <RidgeDivider color="var(--color-parchment)" peakUp />
    </div>
  )
}
