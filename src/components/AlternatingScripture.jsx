import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// AlternatingScripture fades smoothly between two translations of a Bible verse
// (typically English AMP and Tamil) at a regular interval.
// Modeled with AnimatePresence to prevent layout shifting and ensure smooth timing.
export default function AlternatingScripture({
  amp,
  tamil,
  citationAmp,
  citationTamil,
  className = '',
  interval = 5500,
  align = 'center',
}) {
  const [isTamil, setIsTamil] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTamil((prev) => !prev)
    }, interval)
    return () => clearInterval(timer)
  }, [interval])

  const alignClass = align === 'left'
    ? 'text-left justify-start'
    : align === 'right'
      ? 'text-right justify-end'
      : 'text-center justify-center'

  return (
    <div className={`relative min-h-[4.5rem] flex items-center w-full ${alignClass} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.p
          key={isTamil ? 'tamil' : 'amp'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className={`font-serif italic leading-relaxed select-none w-full ${
            align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center'
          }`}
        >
          {isTamil ? `"${tamil}"` : `"${amp}"`}
          <span className="block mt-1 text-xs font-display font-semibold uppercase tracking-widest text-[var(--color-gold)] not-italic">
            — {isTamil ? citationTamil : citationAmp}
          </span>
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
