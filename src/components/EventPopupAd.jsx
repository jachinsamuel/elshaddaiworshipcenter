import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink, Calendar, Bell } from 'lucide-react'
import eventsData from '../content/events.json'

export default function EventPopupAd() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Filter events that have at least an image or a title
  const activeEvents = (eventsData?.events || []).filter(
    (item) => Boolean(item?.image || item?.title)
  )
  const isEnabled = eventsData?.enabled !== false && activeEvents.length > 0

  useEffect(() => {
    if (!isEnabled) return

    // Small delay on page open so the website paints smoothly before the ad pops up
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

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

    // Lock body scrolling when modal is active
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
  const hasDetails = Boolean(
    currentEvent?.title || currentEvent?.date || currentEvent?.description || currentEvent?.link
  )
  const imgMaxHeightClass = hasDetails
    ? 'max-h-[35vh] sm:max-h-[40vh]'
    : 'max-h-[72vh] sm:max-h-[78vh]'

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Upcoming Event Announcement"
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Dimmed backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-lg md:max-w-xl max-h-[92vh] flex flex-col bg-stone-900 border border-white/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Badge & Prominent Close Button */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-stone-950/90 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-[11px] sm:text-xs font-display font-bold tracking-wider text-amber-400 uppercase flex items-center gap-1.5">
                  <Bell size={13} className="text-amber-400" />
                  Upcoming Event
                </span>
                {hasMultiple && (
                  <span className="text-[11px] text-white/50 font-display">
                    ({currentIndex + 1} of {activeEvents.length})
                  </span>
                )}
              </div>

              {/* Close Button ('X') */}
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close advertisement"
                className="group flex items-center gap-1.5 text-xs font-display font-medium text-white/80 hover:text-white bg-white/10 hover:bg-red-600 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm"
              >
                <span>Close</span>
                <X size={15} className="transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto overscroll-contain flex-1 flex flex-col">
              {/* Event Flyer / Image */}
              {currentEvent.image && (
                <div className="relative bg-black/70 flex items-center justify-center p-2 sm:p-3 group">
                  {currentEvent.link ? (
                    <a
                      href={currentEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full ${imgMaxHeightClass} overflow-hidden rounded-xl cursor-pointer`}
                    >
                      <img
                        src={currentEvent.image}
                        alt={currentEvent.title || 'Upcoming Event Flyer'}
                        className={`w-full h-auto ${imgMaxHeightClass} object-contain mx-auto rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-[1.01]`}
                      />
                    </a>
                  ) : (
                    <img
                      src={currentEvent.image}
                      alt={currentEvent.title || 'Upcoming Event Flyer'}
                      className={`w-full h-auto ${imgMaxHeightClass} object-contain mx-auto rounded-xl shadow-lg`}
                    />
                  )}

                  {/* Previous / Next Arrows for Multiple Flyers */}
                  {hasMultiple && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentIndex(
                            (prev) => (prev - 1 + activeEvents.length) % activeEvents.length
                          )
                        }
                        aria-label="Previous flyer"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentIndex((prev) => (prev + 1) % activeEvents.length)
                        }
                        aria-label="Next flyer"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white/90 hover:text-white border border-white/20 transition-all cursor-pointer"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Event Information (if title, date, or description provided) */}
              {hasDetails && (
                <div className="p-4 sm:p-5 bg-stone-900 flex flex-col gap-2.5">
                  {currentEvent.title && (
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
                      {currentEvent.title}
                    </h3>
                  )}

                  {currentEvent.date && (
                    <div className="flex items-center gap-2 text-amber-400 font-display text-xs sm:text-sm font-semibold">
                      <Calendar size={14} />
                      <span>{currentEvent.date}</span>
                    </div>
                  )}

                  {currentEvent.description && (
                    <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                      {currentEvent.description}
                    </p>
                  )}

                  {/* Action Link / Button */}
                  {currentEvent.link && (
                    <div className="pt-1.5">
                      <a
                        href={currentEvent.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-2 rounded-xl font-display font-bold text-xs sm:text-sm text-white bg-[var(--color-brand-red)] hover:bg-red-700 active:scale-[0.98] transition-all shadow-md"
                      >
                        <span>{currentEvent.link_text || 'Learn More'}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Footer with indicator dots & quick dismiss */}
            <div className="px-4 py-2.5 bg-stone-950/80 border-t border-white/10 flex items-center justify-between text-xs text-white/50 shrink-0">
              {hasMultiple ? (
                <div className="flex items-center gap-1.5">
                  {activeEvents.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to flyer ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              ) : (
                <span className="text-[11px] text-white/40">El Shaddai Worship Center</span>
              )}

              <button
                type="button"
                onClick={handleClose}
                className="text-white/60 hover:text-white transition-colors underline underline-offset-2 cursor-pointer text-[11px]"
              >
                Dismiss advertisement
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
