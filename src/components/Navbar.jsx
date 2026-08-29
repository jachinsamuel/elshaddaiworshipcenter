import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import settingsData from '../content/settings.json'
import contactData from '../content/contact.json'
import StaggeredMenu from './StaggeredMenu'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/ministries', label: 'Ministries' },
  { to: '/sermons', label: 'Sermons' },
  { to: '/contact', label: 'Contact' },
  { to: '/give', label: 'Give' },
]

const MENU_ITEMS = [
  { label: 'Home', link: '/' },
  { label: 'About Us', link: '/about' },
  { label: 'Services', link: '/services' },
  { label: 'Ministries', link: '/ministries' },
  { label: 'Sermons', link: '/sermons' },
  { label: 'Contact', link: '/contact' },
  { label: 'Give', link: '/give' },
]

const cleanWhatsappNumber = contactData.whatsapp_number ? contactData.whatsapp_number.replace(/\D/g, '') : ''

const SOCIAL_ITEMS = [
  { label: 'YouTube', link: settingsData.youtube_url },
  { label: 'Facebook', link: settingsData.facebook_url },
  { label: 'Instagram', link: settingsData.instagram_url },
  { label: 'WhatsApp', link: `https://wa.me/${cleanWhatsappNumber}?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20El%20Shaddai%20Worship%20Center` },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <>
      {/* Mobile/Phone Navigation — StaggeredMenu from portfolio */}
      <div className="lg:hidden">
        <StaggeredMenu
          position="right"
          items={MENU_ITEMS}
          socialItems={SOCIAL_ITEMS}
          displaySocials={true}
          displayItemNumbering={false}
          colors={['#15110C', '#1C1712', '#2A221B']}
          accentColor="#ED1C24"
          logoUrl={settingsData.logo}
          isFixed={true}
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ED1C24"
        />
      </div>

      {/* Desktop Navigation Header */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-2' : 'bg-transparent py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={settingsData.logo}
              alt="El Shaddai Worship Center"
              className="transition-all duration-500 w-auto hover:opacity-85"
              style={{ height: scrolled ? 48 : 60 }}
            />
          </Link>

          <nav className="flex items-center gap-9">
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
          </nav>
        </div>
      </header>
    </>
  )
}