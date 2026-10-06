import { motion } from 'framer-motion'
import { useState } from 'react'
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import contactData from '../content/contact.json'
import pageHeaders from '../content/page-headers.json'

const cleanWhatsappNumber = contactData.whatsapp_number ? contactData.whatsapp_number.replace(/\D/g, '') : ''
const whatsappMessage = encodeURIComponent("Hi, I'd like to know more about El Shaddai Worship Center")

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    const form = e.target
    const formData = new FormData(form)

    const googleSheetUrl =
      import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL ||
      contactData.google_sheet_url ||
      ''

    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      address: formData.get('address') || '',
      message: formData.get('message') || '',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }

    try {
      let submitted = false

      // 1. Try sending via serverless /api/contact endpoint
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          const data = await res.json().catch(() => null)
          if (data?.success) {
            submitted = true
          }
        } else {
          const errData = await res.json().catch(() => null)
          // If Google Sheets is explicitly not configured on the backend
          if (errData?.error && !googleSheetUrl) {
            throw new Error(errData.error)
          }
        }
      } catch (err) {
        if (!googleSheetUrl) {
          throw err
        }
      }

      // 2. Fallback: Direct submit to Google Apps Script Web App
      if (!submitted) {
        if (googleSheetUrl) {
          const formBody = new URLSearchParams()
          for (const [key, val] of Object.entries(payload)) {
            formBody.append(key, String(val))
          }

          await fetch(googleSheetUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formBody.toString(),
            mode: 'no-cors',
          })
          submitted = true
        } else {
          throw new Error(
            'Google Sheets Web App URL is not configured yet. Please set it in the Admin Panel (Contact Info) or environment variables.'
          )
        }
      }

      setSent(true)
    } catch (err) {
      setErrorMessage(
        err.message || 'Unable to send message right now. Please try again or reach out on WhatsApp.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Contact Us & Prayer Requests"
        description="Connect with El Shaddai Worship Center, Nagercoil. Location: Subash St, Krishnankovil. Phone: +91 9443581257. Send a prayer request or join our WhatsApp fellowship."
        path="/contact"
      />
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
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl p-6 text-sm">
                <p className="font-semibold mb-1">Thank you! Your message has been received.</p>
                <p className="text-emerald-700/90 text-xs">We will get back to you soon.</p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-4 text-xs font-semibold text-emerald-800 underline hover:no-underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                {errorMessage && (
                  <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 text-xs leading-relaxed flex items-start gap-2.5">
                    <span className="text-amber-600 font-bold text-sm">⚠</span>
                    <div>
                      <p className="font-semibold text-amber-950">Notice</p>
                      <p className="mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}
                <form name="contact" onSubmit={handleSubmit} className="grid gap-5">
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
                  disabled={isSubmitting}
                  className="press group inline-flex items-center justify-center gap-2 bg-[var(--color-royal)] text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-[var(--color-royal-dark)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  <Send size={16} className={`transition-transform ${isSubmitting ? 'animate-pulse' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                </button>
              </form>
            </>
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
              <a href={`tel:${contactData.phone.replace(/\s+/g, '')}`} className="text-sm text-white/80 hover:text-white hover:underline transition-colors">
                {contactData.phone}
              </a>
            </div>
            <div className="flex gap-4">
              <Mail className="text-[var(--color-brand-red)] shrink-0" size={22} strokeWidth={1.5} />
              <a href={`mailto:${contactData.email}`} className="text-sm text-white/80 hover:text-white hover:underline transition-colors">
                {contactData.email}
              </a>
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
          className="hover-lift mt-8 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.06] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
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
              href={`https://wa.me/${cleanWhatsappNumber}?text=${whatsappMessage}`}
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
          className="mt-8 rounded-2xl overflow-hidden border border-stone-100 shadow-sm h-[320px] sm:h-[420px]"
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
