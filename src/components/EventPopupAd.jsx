import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import eventsData from '../content/events.json'

export default function EventPopupAd() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter events that have a poster image
  const activeEvents = (eventsData?.events || []).filter((item) => Boolean(item?.image))
  const isEnabled = eventsData?.enabled !== false && activeEvents.length > 0

  useEffect(() => {
    if (!isEnabled) return

    // Short delay on open so the website renders smoothly before the poster pops up
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [isEnabled])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close on Escape key and navigate with arrow keys
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowRight' && activeEvents.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % activeEvents.length)
      } else if (e.key === 'ArrowLeft' && activeEvents.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + activeEvents.length) % activeEvents.length)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleClose, activeEvents.length])

  if (!isEnabled) return null

  const currentEvent = activeEvents[currentIndex] || activeEvents[0]
  const hasMultiple = activeEvents.length > 1

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Event Poster"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Dimmed backdrop — clicking outside closes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Minimalist Poster Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 max-w-[92vw] sm:max-w-lg md:max-w-xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prominent Floating 'X' Close Button on Top-Right Corner */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close"
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 z-30 p-2 sm:p-2.5 rounded-full bg-black/85 hover:bg-red-600 text-white border border-white/20 shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center group"
            >
              <X size={20} className="transition-transform group-hover:rotate-90" />
            </button>

            {/* Poster Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40">
              {currentEvent.link ? (
                <a
                  href={currentEvent.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer group"
                >
                  <img
                    src={currentEvent.image}
                    alt={currentEvent.title || 'Event Poster'}
                    className="w-auto h-auto max-w-[90vw] sm:max-w-lg md:max-w-xl max-h-[85vh] object-contain rounded-2xl block transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                </a>
              ) : (
                <img
                  src={currentEvent.image}
                  alt={currentEvent.title || 'Event Poster'}
                  className="w-auto h-auto max-w-[90vw] sm:max-w-lg md:max-w-xl max-h-[85vh] object-contain rounded-2xl block"
                />
              )}

              {/* Previous / Next chevrons if multiple posters exist */}
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex(
                        (prev) => (prev - 1 + activeEvents.length) % activeEvents.length
                      )
                    }
                    aria-label="Previous poster"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-black/95 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIndex((prev) => (prev + 1) % activeEvents.length)
                    }
                    aria-label="Next poster"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 hover:bg-black/95 text-white border border-white/20 transition-all cursor-pointer shadow-lg"
                  >
                    <ChevronRight size={22} />
                  </button>

                  {/* Indicator dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
                    {activeEvents.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all ${
                          idx === currentIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
