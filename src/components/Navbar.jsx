import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import settingsData from '../content/settings.json'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/ministries', label: 'Ministries' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
          <img
            src={settingsData.logo}
            alt="El Shaddai Worship Center"
            className="transition-all duration-500 w-auto hover:opacity-85"
            style={{ height: scrolled ? 60 : 75 }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `link-underline font-display text-sm font-medium tracking-wide transition-colors ${
                  scrolled ? 'text-white/85 hover:text-white' : 'text-white hover:text-white/80'
                } ${isActive ? 'border-b-2 border-[var(--color-gold)] pb-1' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/give"
            className="press font-display text-sm font-semibold tracking-wide bg-[var(--color-brand-red)] text-white px-5 py-2.5 rounded-full hover:bg-red-700 hover:-translate-y-0.5 transition-all"
          >
            Give
          </Link>
        </nav>

        <button
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-nav overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-white/90 text-base font-medium"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link
                to="/give"
                onClick={() => setOpen(false)}
                className="press font-display text-sm font-semibold tracking-wide bg-[var(--color-brand-red)] text-white px-5 py-2.5 rounded-full hover:bg-red-700 text-center transition-colors"
              >
                Give
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
