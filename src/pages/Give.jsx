import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check, Landmark, QrCode } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import giveData from '../content/give.json'
import pageHeaders from '../content/page-headers.json'

export default function Give() {
  const [copiedUpi, setCopiedUpi] = useState(false)
  const [copiedField, setCopiedField] = useState('')

  const copy = (text, setter, key) => {
    navigator.clipboard?.writeText(text)
    setter(true)
    setCopiedField(key)
    setTimeout(() => setter(false), 1800)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo title="Give" description="Support El Shaddai Worship Center through UPI or direct bank transfer. Tithes and offerings for the house of God." />
      <PageHeader eyebrow="TITHES & OFFERINGS" title="Give" image={pageHeaders.give} />

      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
            TITHES &amp; OFFERINGS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            Sow Into the House of God
          </h2>
          <p className="text-stone-500 mt-4 text-sm leading-relaxed">
            "Bring the whole tithe into the storehouse, that there may be food in my house." — Malachi 3:10
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {/* UPI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hover-lift bg-white rounded-2xl border border-stone-100 shadow-sm p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
              <QrCode className="text-[var(--color-royal)]" size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--color-slate-deep)] mb-2">UPI Transfer</h3>
            <p className="text-sm text-stone-500 mb-6">Scan or copy the UPI ID below using any UPI app.</p>

            <div className="flex items-center justify-between bg-stone-50 hover:bg-stone-100 rounded-lg px-4 py-3 border border-stone-100 transition-colors">
              <span className="font-mono text-sm text-[var(--color-slate-deep)]">{giveData.upi_id}</span>
              <button
                onClick={() => copy(giveData.upi_id, setCopiedUpi, 'upi')}
                className="press inline-flex items-center gap-1.5 text-xs font-display font-semibold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors"
              >
                {copiedField === 'upi' && copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                {copiedField === 'upi' && copiedUpi ? 'Copied' : 'Copy'}
              </button>
            </div>
          </motion.div>

          {/* Bank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hover-lift bg-white rounded-2xl border border-stone-100 shadow-sm p-8"
          >
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-5">
              <Landmark className="text-[var(--color-brand-red)]" size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--color-slate-deep)] mb-2">Direct Bank Transfer</h3>
            <p className="text-sm text-stone-500 mb-6">Use these details for a direct NEFT/IMPS transfer.</p>

            <dl className="grid gap-3 text-sm">
              {[
                ['Account Name', giveData.account_name, 'name'],
                ['Bank', giveData.bank_name, 'bank'],
                ['Account Number', giveData.account_number, 'acc'],
                ['IFSC Code', giveData.ifsc_code, 'ifsc'],
              ].map(([label, value, key]) => (
                <div key={key} className="flex items-center justify-between bg-stone-50 hover:bg-stone-100 rounded-lg px-4 py-3 border border-stone-100 transition-colors">
                  <div>
                    <dt className="text-xs text-stone-400">{label}</dt>
                    <dd className="text-[var(--color-slate-deep)] font-medium">{value}</dd>
                  </div>
                  <button
                    onClick={() => copy(value, setCopiedUpi, key)}
                    aria-label={`Copy ${label}`}
                    className="press text-stone-400 hover:text-[var(--color-royal)] hover:scale-110 transition-all"
                  >
                    {copiedField === key && copiedUpi ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
