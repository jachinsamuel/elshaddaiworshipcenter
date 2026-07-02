import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import RidgeDivider from './RidgeDivider'
import contactData from '../content/contact.json'
import settingsData from '../content/settings.json'

const NAV_PAIRS = [
  ['Home', '/'],
  ['About Us', '/about'],
  ['Services', '/services'],
  ['Ministries', '/ministries'],
  ['Sermons', '/sermons'],
  ['Contact', '/contact'],
  ['Give', '/give'],
]

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
}

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-slate-deep)] text-white/80 pt-16 pb-5 overflow-hidden">
      {/* Mountain-ridge seam — same pattern as the Hero and PageHeader
          ridges: filled with the section's color above (parchment) and
          contained fully within this section's own box, so it can never
          bleed into or overlap content in the section before it. */}
      <RidgeDivider color="var(--color-parchment)" peakDown />

      <div className="grain absolute inset-0 overflow-hidden" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* Column 1 */}
        <motion.div custom={0} variants={fadeUp} className="flex flex-col items-center gap-4">
          <img
            src={settingsData.footer_logo}
            alt="El Shaddai Worship Center"
            className="w-40 max-w-full h-auto object-contain"
          />
          <div className="flex justify-center gap-3">
            <a href={settingsData.facebook_url} aria-label="Facebook" className="press w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-royal)] hover:-translate-y-0.5 transition-all">
              <Facebook size={16} />
            </a>
            <a href={settingsData.instagram_url} aria-label="Instagram" className="press w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-royal)] hover:-translate-y-0.5 transition-all">
              <Instagram size={16} />
            </a>
            <a href={settingsData.youtube_url} aria-label="YouTube" className="press w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-royal)] hover:-translate-y-0.5 transition-all">
              <Youtube size={16} />
            </a>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div custom={1} variants={fadeUp}>
          <h4 className="font-display text-white text-sm font-semibold tracking-widest mb-4 section-eyebrow">NAVIGATE</h4>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_PAIRS.map(([label, to]) => (
              <Link key={to} to={to} className="link-underline w-fit text-sm hover:text-white transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Column 3 */}
        <motion.div custom={2} variants={fadeUp}>
          <h4 className="font-display text-white text-sm font-semibold tracking-widest mb-4 section-eyebrow">LOCATION</h4>
          <p className="text-sm leading-relaxed flex gap-2">
            <MapPin size={18} className="shrink-0 text-[var(--color-brand-red)] mt-0.5" />
            <span>{contactData.address}</span>
          </p>
        </motion.div>

        {/* Column 4 */}
        <motion.div custom={3} variants={fadeUp}>
          <h4 className="font-display text-white text-sm font-semibold tracking-widest mb-4 section-eyebrow">CONTACT US</h4>
          <p className="text-sm flex items-center gap-2 mb-2">
            <Phone size={16} className="text-[var(--color-brand-red)]" /> {contactData.phone}
          </p>
          <p className="text-sm flex items-center gap-2">
            <Mail size={16} className="text-[var(--color-brand-red)]" /> {contactData.email}
          </p>
        </motion.div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 mt-8 pt-4 border-t border-white/10 text-xs text-white/40 flex flex-col sm:flex-row justify-between gap-2">
        <span>&copy; {new Date().getFullYear()} El Shaddai Worship Center. All rights reserved.</span>
        <span>Nagercoil, Tamil Nadu</span>
      </div>
    </footer>
  )
}
