import { useState } from 'react'
import { motion } from 'framer-motion'
import FallbackImage from './FallbackImage'

// A main portrait with a row of thumbnails underneath. Clicking a
// thumbnail swaps it into the main display — no overlapping badges,
// no lightbox/modal, just a simple in-place swap.
export default function HeadPastorGallery({ leader, className = '', ...props }) {
  const images = [leader.image, leader.secondary_image, leader.secondary_image_2].filter(Boolean)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`order-1 w-full max-w-[440px] md:justify-self-start ${className}`}
      {...props}
    >
      <div className="hover-lift group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100">
        <FallbackImage
          src={images[activeIndex]}
          alt={leader.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show photo ${i + 1} of ${leader.name}`}
              aria-current={i === activeIndex}
              className={`press relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-stone-200 shrink-0 transition-all ${
                i === activeIndex
                  ? 'ring-2 ring-offset-2 ring-[var(--color-royal)]'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <FallbackImage src={img} alt={`${leader.name} photo ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}