import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// Wraps any card to introduce an ultra-smooth interactive 3D tilt effect on hover.
// Includes a dynamic glow overlay that tracks the cursor's location inside the card.
export default function TiltCard({ children, className = '', ...props }) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics setup for smooth orientation recovery on mouse leave
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig)

  // Tracker logic for dynamic hover radial lighting highlights
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], ['0%', '100%']), springConfig)
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], ['0%', '100%']), springConfig)
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX / width)
    y.set(mouseY / height)
  }

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Dynamic follow-cursor radial highlight layer */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 opacity-30"
          style={{
            background: `radial-gradient(circle 140px at ${glowX} ${glowY}, rgba(182, 134, 44, 0.25), transparent)`,
            borderRadius: 'inherit',
          }}
        />
      )}
      <div style={{ transform: 'translateZ(8px)' }} className="h-full w-full rounded-inherit">
        {children}
      </div>
    </motion.div>
  )
}
