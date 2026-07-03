import { motion } from 'framer-motion'
import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import giveData from '../content/give.json'
import pageHeaders from '../content/page-headers.json'
import TiltCard from '../components/TiltCard'
import MagneticElement from '../components/MagneticElement'
import AlternatingScripture from '../components/AlternatingScripture'


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
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            Sow Into the House of God
          </h2>
          <AlternatingScripture
            amp="Let each one give [thoughtfully and with purpose] just as he has decided in his heart, not grudgingly or under compulsion, for God loves a cheerful giver [and He delights in the one whose heart is in his gift]."
            tamil="அவனவன் விசனமாயுமல்ல, கட்டாயமாயுமல்ல, தன் மனதில் நியமித்தபடியே கொடுக்கக்கடவன்; உற்சாகமாய்க் கொடுக்கிறவனிடத்தில் தேவன் பிரியமாயிருக்கிறார்."
            citationAmp="2 Corinthians 9:7 (AMP)"
            citationTamil="2 கொரிந்தியர் 9:7"
            className="text-stone-500 mt-4 text-sm leading-relaxed max-w-2xl mx-auto !min-h-0"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-7">
          {/* UPI */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full h-full"
          >
            <TiltCard className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 cursor-default h-full">
              <h3 className="font-display text-xl font-bold text-[var(--color-slate-deep)] mb-2">UPI Transfer</h3>
              <p className="text-sm text-stone-500 mb-6">Scan or copy the UPI ID below using any UPI app.</p>

              <div className="mb-5 flex justify-center">
                <div className="relative overflow-hidden w-48 h-48 rounded-xl border border-stone-100 bg-stone-50 p-2">
                  <FallbackImage
                    src={giveData.qr_image}
                    alt="UPI QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-stone-50 hover:bg-stone-100 rounded-lg px-4 py-3 border border-stone-100 transition-colors">
                <span className="font-mono text-sm text-[var(--color-slate-deep)]">{giveData.upi_id}</span>
                <MagneticElement>
                  <button
                    onClick={() => copy(giveData.upi_id, setCopiedUpi, 'upi')}
                    className="press inline-flex items-center gap-1.5 text-xs font-display font-semibold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors"
                  >
                    {copiedField === 'upi' && copiedUpi ? <Check size={14} /> : <Copy size={14} />}
                    {copiedField === 'upi' && copiedUpi ? 'Copied' : 'Copy'}
                  </button>
                </MagneticElement>
              </div>
            </TiltCard>
          </motion.div>

          {/* Bank */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="w-full h-full"
          >
            <TiltCard className="bg-[var(--color-slate-deep)] text-white rounded-2xl border border-white/5 shadow-xl p-8 cursor-default h-full">
              <h3 className="font-display text-xl font-bold text-white mb-2">Direct Bank Transfer</h3>
              <p className="text-sm text-white/70 mb-6">Use these details for a direct NEFT/IMPS transfer.</p>

              <dl className="grid gap-3 text-sm">
                {[
                  ['Account Name', giveData.account_name, 'name'],
                  ['Bank', giveData.bank_name, 'bank'],
                  ['Account Number', giveData.account_number, 'acc'],
                  ['IFSC Code', giveData.ifsc_code, 'ifsc'],
                ].map(([label, value, key]) => (
                  <div key={key} className="flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] rounded-lg px-4 py-3 border border-white/5 transition-colors">
                    <div>
                      <dt className="text-xs text-white/50">{label}</dt>
                      <dd className="text-white font-medium">{value}</dd>
                    </div>
                    <MagneticElement>
                      <button
                        onClick={() => copy(value, setCopiedUpi, key)}
                        aria-label={`Copy ${label}`}
                        className="press text-white/40 hover:text-[var(--color-gold)] hover:scale-110 transition-all"
                      >
                        {copiedField === key && copiedUpi ? <Check size={15} /> : <Copy size={15} />}
                      </button>
                    </MagneticElement>
                  </div>
                ))}
              </dl>
            </TiltCard>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
