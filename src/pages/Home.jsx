import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { PlayCircle, ArrowRight, Clock, Radio } from 'lucide-react'
import RidgeDivider from '../components/RidgeDivider'
import Seo from '../components/Seo'
import { getLiveService } from '../lib/schedule'
import settingsData from '../content/settings.json'
import leadersData from '../content/leaders.json'
import aboutContent from '../content/about-content.json'
import glimpsesData from '../content/glimpses.json'

const YOUTUBE_CHANNEL_ID = settingsData.youtube_channel_id

const SCHEDULE_PREVIEW = [
  { day: 'Sunday', time: '6:00 AM & 10:00 AM', label: 'Family Worship' },
  { day: 'Friday', time: '10:00 AM', label: 'Fasting Prayer' },
  { day: 'Saturday', time: '7:00 PM', label: 'Night Worship' },
]

const ABOUT_STATS = [
  { label: 'Started At', value: aboutContent.founding_summary || 'Founded in 1985 by our Founding Apostle, in a small gathering of believers.' },
  { label: 'Location', value: 'Nagercoil, Tamil Nadu — serving the community for over four decades.' },
]

export default function Home() {
  // Re-checks every minute so the live embed appears/disappears on its own
  // right at service start/end time, with no manual toggling required.
  const [liveService, setLiveService] = useState(() => getLiveService())

  useEffect(() => {
    const interval = setInterval(() => setLiveService(getLiveService()), 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Home"
        description="El Shaddai Worship Center, Nagercoil — a family of faith rooted in apostolic truth and Holy Ghost power. Join us for worship, watch live, and find your place to belong."
      />
      {/* Hero — raw video, no overlays. Asymmetric serif headline with a
          hand-drawn underline stroke as the page's signature mark, and a
          mountain-ridge edge (the El Shaddai motif) cutting into the next
          section instead of a generic fade. */}
      <section id="hero" className="relative h-screen w-full overflow-hidden bg-[var(--color-slate-deep)]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={settingsData.hero_video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="relative h-full flex flex-col justify-end pb-32 px-6 lg:px-16 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif italic text-white/80 text-base md:text-lg mb-3 max-w-md"
          >
            "I am God Almighty — walk before me and be blameless." — Genesis 17:1
          </motion.p>

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
            className="flex flex-wrap gap-4 mt-10"
          >
            {liveService ? (
              <a
                href="#live-now"
                className="press group inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-sm tracking-wide pl-6 pr-5 py-3.5 hover:bg-red-700 hover:-translate-y-0.5 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                Watch Live Now
              </a>
            ) : (
              <a
                href={settingsData.youtube_watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="press group inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-sm tracking-wide pl-6 pr-5 py-3.5 hover:bg-red-700 hover:-translate-y-0.5 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}
              >
                <PlayCircle size={18} /> Watch Live
              </a>
            )}
            <a
              href="#schedule"
              className="press group inline-flex items-center gap-2 border border-white/40 text-white font-display font-semibold text-sm tracking-wide pl-6 pr-5 py-3.5 hover:bg-white/10 hover:-translate-y-0.5 transition-all"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 92% 100%, 0 100%)' }}
            >
              Join Service <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Mountain-ridge signature edge dropping into the next section */}
        <RidgeDivider color="var(--color-parchment)" peakUp />
      </section>

      {/* Live Now — only renders while a service from the schedule is
          currently in progress, checked every minute. No manual toggle. */}
      {liveService && (
        <section id="live-now" className="bg-[var(--color-ink)] py-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <div className="flex items-center gap-2.5 justify-center mb-6">
              <Radio size={16} className="text-[var(--color-brand-red)]" />
              <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-brand-red)] section-eyebrow">
                LIVE NOW &mdash; {liveService.title.toUpperCase()}
              </p>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=0`}
                title="Live service stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-white/50 text-sm mt-5">
              Can't see the stream? <a href={settingsData.youtube_watch_url} target="_blank" rel="noopener noreferrer" className="text-white underline hover:text-[var(--color-gold)]">Watch directly on YouTube</a>.
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hover-lift group rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100"
          >
            <img
              src={aboutContent.sanctuary_image}
              alt="El Shaddai sanctuary"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Head Pastor — image left, text right, mirroring the reference
          site's second homepage block. Full bio, family detail, and social
          links live on the About page; this is a brief spotlight. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hover-lift group rounded-2xl overflow-hidden shadow-lg aspect-[4/5] max-h-[480px] bg-stone-100"
          >
            <img
              src={leadersData.head_pastor.image}
              alt={leadersData.head_pastor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
              {leadersData.head_pastor.role.toUpperCase()}
            </p>
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

      {/* Schedule preview */}
      <section id="schedule" className="relative bg-[var(--color-ink)] py-24 overflow-hidden">
        <div className="grain absolute inset-0" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-gold)] section-eyebrow mb-3">
                THIS WEEK
              </p>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-white">Join Us for a Service</h2>
            </div>
            <Link
              to="/services"
              className="group font-display text-sm font-semibold text-white inline-flex items-center gap-1.5 hover:text-[var(--color-gold)] transition-colors"
            >
              Full Schedule <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {SCHEDULE_PREVIEW.map((s, i) => (
              <motion.div
                key={s.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="hover-lift bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07]"
              >
                <Clock className="text-[var(--color-brand-red)] mb-4" size={24} />
                <p className="font-display text-white font-semibold text-lg mb-1">{s.day}</p>
                <p className="text-white/60 text-sm mb-1">{s.time}</p>
                <p className="text-[var(--color-gold)] text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Glimpses — a small/large/small photo rhythm rather than a uniform
          grid, so the page has a moment of visual variation. Links through
          to Sermons & Media, where the rest of the photo/video content lives. */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-royal)] section-eyebrow mb-3">
              LIFE AT EL SHADDAI
            </p>
            <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">Glimpses of Worship</h2>
          </div>
          <Link
            to="/sermons"
            className="group font-display text-sm font-semibold text-[var(--color-royal)] inline-flex items-center gap-1.5 hover:text-[var(--color-royal-dark)] transition-colors"
          >
            More Moments <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 md:h-[420px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hover-lift group rounded-2xl overflow-hidden bg-stone-200 aspect-square md:aspect-auto md:h-full"
          >
            <img src={glimpsesData.glimpses[0]?.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hover-lift group col-span-2 rounded-2xl overflow-hidden bg-stone-200 aspect-square md:aspect-auto md:h-full"
          >
            <img src={glimpsesData.glimpses[1]?.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hover-lift group rounded-2xl overflow-hidden bg-stone-200 aspect-square md:aspect-auto md:h-full"
          >
            <img src={glimpsesData.glimpses[2]?.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
