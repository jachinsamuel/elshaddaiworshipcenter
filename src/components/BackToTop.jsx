import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

// Floating "Back to Top" button — appears after the user scrolls past
// 400 px. Uses the site's standard `press` micro-interaction and brand
// colors, with a Framer Motion fade-in/out so it doesn't pop abruptly.
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="press fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[var(--color-slate-deep)] text-[var(--color-gold)] border border-[var(--color-gold)]/30 shadow-lg flex items-center justify-center hover:bg-[var(--color-gold)] hover:text-[var(--color-slate-deep)] hover:-translate-y-0.5 transition-all"
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
