import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PlayCircle, ArrowRight } from 'lucide-react'
import RidgeDivider from '../components/RidgeDivider'
import Seo from '../components/Seo'
import FallbackImage from '../components/FallbackImage'
import { getLiveService, SCHEDULE } from '../lib/schedule'
import settingsData from '../content/settings.json'
import leadersData from '../content/leaders.json'
import aboutContent from '../content/about-content.json'
import glimpsesData from '../content/glimpses.json'
import eventsData from '../content/events.json'
import TiltCard from '../components/TiltCard'
import MagneticElement from '../components/MagneticElement'
import AlternatingScripture from '../components/AlternatingScripture'


const YOUTUBE_CHANNEL_ID = settingsData.youtube_channel_id

const ABOUT_STATS = [
  { label: 'Started At', value: aboutContent.founding_summary || 'Founded in 1985 by our Founding Apostle, in a small gathering of believers.' },
  { label: 'Location', value: 'Nagercoil, Tamil Nadu, serving the community for over four decades.' },
]

export default function Home() {
  const [liveService, setLiveService] = useState(() => getLiveService())

  useEffect(() => {
    const interval = setInterval(() => setLiveService(getLiveService()), 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Home"
        description="El Shaddai Worship Center, Nagercoil, a family of faith rooted in apostolic truth and Holy Ghost power. Join us for worship, watch live, and find your place to belong."
      />
      {/* Hero — raw video, no overlays. Asymmetric serif headline with a
          hand-drawn underline stroke as the page's signature mark, and a
          mountain-ridge edge (the El Shaddai motif) cutting into the next
          section instead of a generic fade. */}
      <section id="hero" className="relative h-[100dvh] w-full overflow-hidden bg-[var(--color-slate-deep)]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={settingsData.hero_video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative h-full flex flex-col justify-end pb-32 px-6 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-8 items-end w-full">
            {/* Title & Buttons Column */}
            <div className="md:col-span-7 flex flex-col items-start">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
                className="font-serif text-white text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[0.98]"
              >
                El Shaddai
                <br />
                Worship Center
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.7 }}
                className="flex flex-wrap gap-4 mt-8"
              >
                {liveService ? (
                  <MagneticElement>
                    <a
                      href="#live-now"
                      className="press group inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-red-700 hover:-translate-y-0.5 transition-all shadow-lg"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-red)] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-red)]" />
                      </span>
                      Watch Live Now
                    </a>
                  </MagneticElement>
                ) : (
                  <MagneticElement>
                    <a
                      href={settingsData.youtube_watch_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press group inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-red-700 hover:-translate-y-0.5 transition-all shadow-lg"
                    >
                      <PlayCircle size={18} /> Watch Live
                    </a>
                  </MagneticElement>
                )}
                <MagneticElement>
                  <a
                    href="#schedule"
                    className="press group inline-flex items-center gap-2 border border-white/40 text-white font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-white/10 hover:-translate-y-0.5 transition-all shadow-lg"
                  >
                    Join Service <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </MagneticElement>
              </motion.div>
            </div>

            {/* Alternating Scripture Column */}
            <div className="md:col-span-5 flex justify-end w-full md:pb-3">
              <AlternatingScripture
                amp="Do not fear, O land; be glad and rejoice, for the Lord has done great things."
                tamil="தேசமே, பயப்படாதே, மகிழ்ந்து களிகூரு; கர்த்தர் பெரிய காரியங்களைச் செய்வார்."
                citationAmp="Joel 2:21 (AMP)"
                citationTamil="யோவேல் 2:21"
                align="right"
                className="text-white/90 text-right md:text-lg max-w-md !min-h-0"
              />
            </div>
          </div>
        </div>

        {/* Mountain-ridge signature edge dropping into the next section */}
        <RidgeDivider color="var(--color-parchment)" peakUp />
      </section>

      {/* Watch Live - warm cinematic section, only visible during scheduled services */}
      {liveService && (
        <section id="live-now" className="relative bg-[var(--color-parchment)] py-20 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-3 justify-center mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-red)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-red)]" />
              </span>
              <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-ink)] section-eyebrow">
                LIVE NOW | {liveService.title.toUpperCase()}
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-stone-300 shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=0`}
                title="Live service stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-stone-500 text-sm mt-6">
              Can't see the stream? <a href={settingsData.youtube_watch_url} target="_blank" rel="noopener noreferrer" className="text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors">Watch directly on YouTube</a>.
            </p>
          </div>
        </section>
      )}
      {/* About the church — brief intro with image, mirroring the reference
          site's homepage pattern. Full founding story stays on the About
          page; this is just enough to orient a first-time visitor. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
              WHO WE ARE
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)] mb-5">
              El Shaddai Worship Center
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              {aboutContent.home_intro}
            </p>
            <Link
              to="/about"
              className="link-underline font-display text-sm font-semibold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors"
            >
              Know More
            </Link>

            <div className="grid grid-cols-2 gap-3 mt-9">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.label} className="bg-stone-50 border border-stone-100 rounded-xl p-4">
                  <p className="font-display text-xs font-semibold tracking-widest text-stone-400 mb-1.5">
                    {stat.label.toUpperCase()}
                  </p>
                  <p className="text-sm text-[var(--color-ink)] leading-snug">{stat.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="w-full max-w-[440px] md:justify-self-end"
          >
            <TiltCard className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100 w-full">
              <FallbackImage
                src={aboutContent.sanctuary_image}
                alt="El Shaddai sanctuary"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Head Pastor — image left, text right, mirroring the reference
          site's second homepage block. Full bio, family detail, and social
          links live on the About page; this is a brief spotlight. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full max-w-[440px] md:justify-self-start"
          >
            <TiltCard className="relative group rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100 w-full">
              <FallbackImage
                src={leadersData.head_pastor.image}
                alt={leadersData.head_pastor.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </TiltCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)] mb-5">
              {leadersData.head_pastor.name}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              {leadersData.head_pastor.home_blurb}
            </p>
            <Link
              to="/about"
              className="link-underline font-display text-sm font-semibold text-[var(--color-royal)] hover:text-[var(--color-royal-dark)] transition-colors"
            >
              Know More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Schedule preview section — redesigned based on the user's reference image */}
      <section
        id="schedule"
        className="relative py-28 overflow-hidden bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,10,12,0.85), rgba(10,10,12,0.85)), url(${aboutContent.sanctuary_image})`,
        }}
      >
        <div className="grain absolute inset-0 opacity-[0.03]" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            {/* Header: Our Services */}
            <div className="flex flex-col items-center mb-10">
              <h2 className="font-display text-4xl md:text-5xl font-black tracking-tight text-white uppercase select-none">
                Our Services
              </h2>
              <div className="w-20 h-1 bg-[var(--color-brand-red)] mt-4 rounded-full" />
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-6 text-base md:text-lg text-white/90 max-w-2xl mx-auto font-display mb-10">
              {SCHEDULE.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 leading-relaxed border-b border-white/[0.04] pb-4 last:border-b-0 last:pb-0"
                >
                  <span className="font-bold text-white tracking-wide">{s.title}:</span>
                  <span className="text-white/80">{s.timeLabel}</span>
                </motion.div>
              ))}
            </div>

            {/* Click Here Link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/80 text-sm md:text-base font-display font-medium pt-6 border-t border-white/10"
            >
              Know More About the Other Services{' '}
              <MagneticElement className="ml-1 inline-block vertical-align-middle">
                <Link
                  to="/services"
                  className="press inline-flex items-center gap-1 font-bold text-[var(--color-brand-red)] hover:text-red-500 transition-colors uppercase"
                >
                  Click Here &gt;&gt;
                </Link>
              </MagneticElement>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {eventsData.events.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">Upcoming Events</h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.events.map((event, i) => (
              <motion.div
                key={event.title + event.date}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-full h-full"
              >
                <TiltCard className="group rounded-2xl border border-stone-100 shadow-sm bg-white overflow-hidden cursor-default h-full">
                  {event.image && (
                    <div className="relative overflow-hidden aspect-video bg-stone-100">
                      <FallbackImage
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="inline-block bg-[var(--color-royal)]/10 text-[var(--color-royal)] text-xs font-display font-semibold px-3 py-1 rounded-full mb-3">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      {event.time ? ` · ${event.time}` : ''}
                    </div>
                    <h3 className="font-display text-lg font-bold text-[var(--color-slate-deep)] mb-2">{event.title}</h3>
                    {event.description && <p className="text-sm text-stone-500 leading-relaxed">{event.description}</p>}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Glimpses — a continuous scrolling photo strip that auto-plays and
          pauses on hover, giving the page a sense of motion and life. */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">Glimpses of Worship</h2>
            </div>
          </div>
        </div>

        <div className="flex gap-5 marquee">
          {[...glimpsesData.glimpses, ...glimpsesData.glimpses].map((g, i) => (
            <div
              key={i}
              className="relative overflow-hidden shrink-0 w-64 h-44 sm:w-72 sm:h-48 md:w-80 md:h-56 rounded-2xl bg-stone-200"
            >
              <FallbackImage
                src={g.image}
                alt="Glimpse of worship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
