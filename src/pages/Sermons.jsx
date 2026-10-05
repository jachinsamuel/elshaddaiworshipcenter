import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink,
  ListVideo,
  Calendar,
  Youtube,
  PlayCircle,
  ArrowUpRight,
  Layers,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import TiltCard from '../components/TiltCard'
import MagneticElement from '../components/MagneticElement'
import pageHeaders from '../content/page-headers.json'
import playlistsData from '../content/playlists.json'
import settingsData from '../content/settings.json'
import { getPlaylistWatchUrl } from '../lib/youtube'

export default function Sermons() {
  const playlists = useMemo(() => {
    return Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : []
  }, [])

  // Distinct sorted years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(playlists.map((p) => String(p.year || '')).filter(Boolean)))
    return years.sort((a, b) => b.localeCompare(a))
  }, [playlists])

  const [selectedYearFilter, setSelectedYearFilter] = useState('All')

  // Filtered playlists
  const filteredPlaylists = useMemo(() => {
    if (selectedYearFilter === 'All') return playlists
    return playlists.filter((p) => String(p.year) === selectedYearFilter)
  }, [playlists, selectedYearFilter])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Sermons & YouTube Playlists"
        description="Watch anointed sermons, live Sunday messages, and yearly YouTube message playlists from El Shaddai Worship Center, Nagercoil."
        path="/sermons"
      />
      <PageHeader eyebrow="WATCH & LISTEN" title="Sermons & Media" image={pageHeaders.sermons} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-14 sm:py-20">
        {/* Curated Archive Gallery Header & Interactive Year Pills */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5">
                <Layers className="text-[var(--color-gold)]" size={19} />
                <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-gold)] uppercase">
                  OFFICIAL YOUTUBE ARCHIVE
                </p>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[var(--color-ink)] mb-3">
                Browse Sermon Playlists
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Explore complete yearly Sunday services, Friday fasting prayer gatherings, and convention teachings preserved on our official YouTube channel.
              </p>
            </div>

            {/* Year Selector Tabs with Smooth Pill Indicator */}
            {availableYears.length > 0 && (
              <div className="flex items-center gap-2 p-1.5 bg-[#EEE7D8]/80 backdrop-blur-md rounded-full border border-[#DFD5C2] shrink-0 self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setSelectedYearFilter('All')}
                  className={`press px-4 py-2 rounded-full font-display text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap ${
                    selectedYearFilter === 'All'
                      ? 'bg-[var(--color-slate-deep)] text-white shadow-md'
                      : 'text-stone-600 hover:text-[var(--color-ink)]'
                  }`}
                >
                  All Collections
                </button>

                {availableYears.map((yr) => {
                  const isCurrent = selectedYearFilter === yr
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setSelectedYearFilter(yr)}
                      className={`press px-4 py-2 rounded-full font-display text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-[var(--color-brand-red)] text-white shadow-md'
                          : 'text-stone-600 hover:text-[var(--color-ink)]'
                      }`}
                    >
                      <Calendar size={13} className={isCurrent ? 'text-white' : 'text-stone-400'} />
                      {yr}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* Bespoke Sacred Anthology Playlist Cards (4-Column Grid)           */}
          {/* ----------------------------------------------------------------- */}
          <AnimatePresence mode="popLayout">
            {filteredPlaylists.length > 0 ? (
              <motion.div
                key={selectedYearFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7"
              >
                {filteredPlaylists.map((pl, index) => {
                  const directWatchUrl = getPlaylistWatchUrl(pl.url)

                  return (
                    <motion.div
                      key={`${pl.year}-${pl.title}-${index}`}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                      className="h-full"
                    >
                      <TiltCard className="h-full">
                        <a
                          href={directWatchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex flex-col justify-between h-full bg-[#FAF6EE] hover:bg-white rounded-3xl p-5 border border-[#E7DFCE] ring-1 ring-black/[0.03] shadow-[0_4px_20px_rgba(21,17,12,0.03)] hover:shadow-2xl hover:border-[var(--color-gold)]/50 transition-all duration-400 overflow-hidden"
                        >
                          {/* Ambient Gold Aura on Hover */}
                          <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[var(--color-gold)]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                          <div>
                            {/* Cascading Anthology Stack Artwork Container */}
                            <div className="relative mb-5 pt-2.5">
                              {/* Layer 1: Gold Archival Backing */}
                              <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-[82%] h-3 rounded-t-xl bg-gradient-to-r from-[var(--color-gold)]/35 via-amber-700/25 to-[var(--color-gold)]/35 border-t border-x border-amber-300/30 transition-all duration-500 ease-out group-hover:-translate-y-1.5 group-hover:w-[86%]"
                                aria-hidden="true"
                              />
                              {/* Layer 2: Deep Slate Slipcover */}
                              <div
                                className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[92%] h-3 rounded-t-xl bg-[var(--color-slate-deep)] border-t border-x border-white/10 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:w-[95%]"
                                aria-hidden="true"
                              />

                              {/* Layer 3: Main Artwork */}
                              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-950 shadow-md border border-stone-800/40">
                                <FallbackImage
                                  src={pl.thumb || '/sermons/sunday-service-2026.jpg'}
                                  alt={pl.title}
                                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />

                                {/* Subtle Cinematic Tint Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent group-hover:opacity-40 transition-opacity duration-300" />

                                {/* Floating Micro Play Disc on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-12 h-12 rounded-full bg-white text-[var(--color-brand-red)] flex items-center justify-center shadow-xl scale-75 group-hover:scale-100 transition-transform duration-300">
                                    <PlayCircle size={28} />
                                  </div>
                                </div>

                                {/* Year Pill Badge */}
                                <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white font-display text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/10 tracking-wide">
                                  {pl.year}
                                </div>

                                {/* Category Tag */}
                                <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white/90 text-[10px] font-display font-medium px-2.5 py-0.5 rounded-md flex items-center gap-1 border border-white/10">
                                  <ListVideo size={10} className="text-[var(--color-gold)]" />
                                  <span>{pl.category || 'Series'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Title & Narrative */}
                            <h3 className="font-serif text-lg sm:text-xl font-medium text-[var(--color-ink)] leading-snug group-hover:text-[var(--color-brand-red)] transition-colors mb-2 line-clamp-1">
                              {pl.title}
                            </h3>

                            <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-5 font-sans">
                              {pl.description || 'Full worship services, anointed messages, and spiritual gatherings preserved on YouTube.'}
                            </p>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="pt-3.5 border-t border-[#EDE5D6] flex items-center justify-between mt-auto">
                            <span className="text-xs font-display font-semibold text-stone-600 group-hover:text-[var(--color-brand-red)] transition-colors flex items-center gap-1.5">
                              <PlayCircle size={14} className="text-[var(--color-brand-red)]" />
                              Watch on YouTube
                            </span>

                            <span className="w-8 h-8 rounded-full bg-white group-hover:bg-[var(--color-brand-red)] text-stone-500 group-hover:text-white flex items-center justify-center border border-stone-200/80 group-hover:border-[var(--color-brand-red)] shadow-xs transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                              <ArrowUpRight size={13} />
                            </span>
                          </div>
                        </a>
                      </TiltCard>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <div className="bg-[#FAF6EE] border border-[#E7DFCE] rounded-3xl p-12 text-center max-w-lg mx-auto shadow-sm">
                <ListVideo className="text-stone-400 mx-auto mb-3" size={40} />
                <h4 className="font-serif text-2xl text-[var(--color-ink)] mb-2">No Playlists Found</h4>
                <p className="text-sm text-stone-500 mb-6">
                  No playlists are currently cataloged under year {selectedYearFilter}.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedYearFilter('All')}
                  className="press bg-[var(--color-slate-deep)] text-white text-xs font-display font-semibold px-6 py-2.5 rounded-full"
                >
                  Show All Collections
                </button>
              </div>
            )}
          </AnimatePresence>
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* YouTube Channel Subscription Banner                               */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-r from-[var(--color-slate-deep)] via-[#221811] to-[var(--color-slate-deep)] p-8 sm:p-12 text-white border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-red)] text-white flex items-center justify-center shrink-0 shadow-xl">
              <Youtube size={36} />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1.5">
                Subscribe to Our Official Channel
              </h3>
              <p className="text-white/70 text-sm max-w-md">
                Join our online worship family. Get notified whenever new Sunday services, sermons, and live streams are published.
              </p>
            </div>
          </div>

          <MagneticElement>
            <a
              href={settingsData.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="press shrink-0 inline-flex items-center gap-2 bg-white text-[var(--color-ink)] font-display font-semibold text-sm tracking-wide px-7 py-3.5 rounded-full hover:bg-stone-100 hover:-translate-y-0.5 transition-all shadow-lg"
            >
              Subscribe on YouTube <ExternalLink size={15} />
            </a>
          </MagneticElement>
        </motion.div>
      </div>
    </motion.div>
  )
}
