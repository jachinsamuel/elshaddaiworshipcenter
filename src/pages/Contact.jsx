import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import contactData from '../content/contact.json'
import pageHeaders from '../content/page-headers.json'

const whatsappMessage = encodeURIComponent("Hi, I'd like to know more about El Shaddai Worship Center")

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      })
      setSent(true)
    } catch {
      setSent(true)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Contact Us" description="Get in touch with El Shaddai Worship Center, Nagercoil. Visit us, call, message on WhatsApp, or send a message directly." />
      <PageHeader eyebrow="REACH OUT" title="Contact Us" image={pageHeaders.contact} />

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8"
          >
            <h2 className="font-serif text-2xl font-medium text-[var(--color-ink)] mb-1">Send a Message</h2>
            <p className="text-sm text-stone-500 mb-7">We would love to hear from you.</p>

            {sent ? (
              <div className="bg-blue-50 border border-blue-100 text-[var(--color-royal-dark)] rounded-xl p-6 text-sm">
                Thank you, your message has been received. We'll be in touch soon.
              </div>
            ) : (
              <form name="contact" onSubmit={handleSubmit} data-netlify="true" className="grid gap-5">
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-display font-semibold text-stone-500 mb-1.5">Name</label>
                    <input required type="text" id="contact-name" name="name" className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-royal)]" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-display font-semibold text-stone-500 mb-1.5">Email</label>
                    <input required type="email" id="contact-email" name="email" className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-royal)]" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-display font-semibold text-stone-500 mb-1.5">Phone</label>
                    <input type="tel" id="contact-phone" name="phone" className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-royal)]" />
                  </div>
                  <div>
                    <label htmlFor="contact-address" className="block text-xs font-display font-semibold text-stone-500 mb-1.5">Address</label>
                    <input type="text" id="contact-address" name="address" className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-royal)]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-display font-semibold text-stone-500 mb-1.5">Message</label>
                  <textarea required rows={5} id="contact-message" name="message" className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-royal)] resize-none" />
                </div>
                <button
                  type="submit"
                  className="press group inline-flex items-center justify-center gap-2 bg-[var(--color-royal)] text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-[var(--color-royal-dark)] hover:-translate-y-0.5 transition-all"
                >
                  Send Message <Send size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            className="bg-[var(--color-slate-deep)] rounded-2xl p-8 text-white flex flex-col justify-center gap-7"
          >
            <div>
              <h2 className="font-serif text-2xl font-medium mb-1">Visit or Reach Us</h2>
              <p className="text-white/60 text-sm">We're here for you every day of the week.</p>
            </div>

            <div className="flex gap-4">
              <MapPin className="text-[var(--color-brand-red)] shrink-0" size={22} strokeWidth={1.5} />
              <p className="text-sm text-white/80 leading-relaxed">
                {contactData.address}
              </p>
            </div>
            <div className="flex gap-4">
              <Phone className="text-[var(--color-brand-red)] shrink-0" size={22} strokeWidth={1.5} />
              <p className="text-sm text-white/80">{contactData.phone}</p>
            </div>
            <div className="flex gap-4">
              <Mail className="text-[var(--color-brand-red)] shrink-0" size={22} strokeWidth={1.5} />
              <p className="text-sm text-white/80">{contactData.email}</p>
            </div>
          </motion.div>
        </div>

        {/* WhatsApp community — many congregations here coordinate more
            through WhatsApp than email, so this sits as its own moment
            rather than buried as a small icon in the contact card. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="hover-lift mt-8 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.06] p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[var(--color-ink)] mb-1">Join Our WhatsApp Community</h3>
              <p className="text-sm text-stone-600">
                Get service reminders, prayer requests, and announcements straight to your phone.
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={contactData.whatsapp_group_link}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-display font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#1faa53] hover:-translate-y-0.5 transition-all"
            >
              Join Group
            </a>
            <a
              href={`https://wa.me/${contactData.whatsapp_number}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="press flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-[#25D366] text-[#1faa53] font-display font-semibold text-sm px-6 py-3 rounded-full hover:bg-[#25D366]/10 hover:-translate-y-0.5 transition-all"
            >
              Message Us
            </a>
          </div>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-[420px]"
        >
          <iframe
            title="El Shaddai Worship Center Location"
            src={contactData.map_embed_url}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </motion.div>
  )
}
