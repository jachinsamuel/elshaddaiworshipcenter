import { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { PlayCircle, ExternalLink, ListVideo, Calendar, Youtube } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import TiltCard from '../components/TiltCard'
import MagneticElement from '../components/MagneticElement'
import pageHeaders from '../content/page-headers.json'
import playlistsData from '../content/playlists.json'
import settingsData from '../content/settings.json'
import { getPlaylistEmbedUrl, getPlaylistWatchUrl } from '../lib/youtube'

export default function Sermons() {
  const playerRef = useRef(null)

  const playlists = useMemo(() => {
    return Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : []
  }, [])

  // Extract distinct years sorted descending
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(playlists.map((p) => String(p.year || '')).filter(Boolean)))
    return years.sort((a, b) => b.localeCompare(a))
  }, [playlists])

  const [selectedYearFilter, setSelectedYearFilter] = useState('All')
  const [activePlaylistIndex, setActivePlaylistIndex] = useState(0)

  // Filtered playlists list based on year tab
  const filteredPlaylists = useMemo(() => {
    if (selectedYearFilter === 'All') return playlists
    return playlists.filter((p) => String(p.year) === selectedYearFilter)
  }, [playlists, selectedYearFilter])

  const activePlaylist = playlists[activePlaylistIndex] || playlists[0]
  const embedUrl = activePlaylist ? getPlaylistEmbedUrl(activePlaylist.url) : null
  const watchUrl = activePlaylist ? getPlaylistWatchUrl(activePlaylist.url) : settingsData.youtube_url

  const handleSelectPlaylist = (index, shouldScroll = false) => {
    setActivePlaylistIndex(index)
    if (shouldScroll && playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Sermons & YouTube Playlists"
        description="Watch anointed sermons, live Sunday messages, and yearly YouTube message playlists from El Shaddai Worship Center, Nagercoil."
        path="/sermons"
      />
      <PageHeader eyebrow="WATCH & LISTEN" title="Sermons & Media" image={pageHeaders.sermons} />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-12 sm:py-16">
        {/* ----------------------------------------------------------------- */}
        {/* Theater Player Showcase                                           */}
        {/* ----------------------------------------------------------------- */}
        {activePlaylist && (
          <section ref={playerRef} className="scroll-mt-28 mb-16 sm:mb-24">
            <div className="relative rounded-3xl bg-[var(--color-slate-deep)] border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
              {/* Theater Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-3.5 bg-white/[0.03] border-b border-white/10 text-xs font-display">
                <div className="flex items-center gap-2 text-white/90 font-medium">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-brand-red)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-brand-red)]" />
                  </span>
                  <span>CONTINUOUS PLAYLIST STREAM</span>
                </div>
                <div className="flex items-center gap-3 text-white/60">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[var(--color-gold)] font-semibold tracking-wider uppercase text-[11px]">
                    {activePlaylist.year} SERIES
                  </span>
                </div>
              </div>

              {/* Main Theater Stage */}
              <div className="grid lg:grid-cols-12 gap-0">
                {/* 16:9 Embedded YouTube Playlist Player */}
                <div className="lg:col-span-8 bg-black aspect-video relative w-full flex items-center justify-center">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={activePlaylist.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="p-8 text-center text-white">
                      <PlayCircle size={56} className="text-white/40 mx-auto mb-3" />
                      <p className="text-sm text-white/80 mb-4">Click below to open this playlist on YouTube</p>
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white px-5 py-2.5 rounded-full text-xs font-display font-semibold"
                      >
                        Open on YouTube <ExternalLink size={14} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Playlist Info Panel */}
                <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-white/[0.04] to-transparent text-white">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-snug mb-4">
                      {activePlaylist.title}
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {activePlaylist.description ||
                        'Watch all full-length messages, special conventions, and worship sessions recorded live at El Shaddai Worship Center.'}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
                    <MagneticElement>
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press w-full inline-flex items-center justify-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-xs sm:text-sm tracking-wide px-6 py-3.5 rounded-full hover:bg-red-700 hover:-translate-y-0.5 transition-all shadow-lg"
                      >
                        <Youtube size={17} /> Watch on YouTube <ExternalLink size={14} />
                      </a>
                    </MagneticElement>

                    <a
                      href={settingsData.youtube_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press w-full inline-flex items-center justify-center gap-1.5 text-xs text-white/60 hover:text-white font-display py-2 transition-colors"
                    >
                      Visit Channel Homepage <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Browse All Playlists by Year                                      */}
        {/* ----------------------------------------------------------------- */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ListVideo className="text-[var(--color-brand-red)]" size={20} />
                <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-brand-red)] uppercase">
                  COMPLETE ARCHIVE
                </p>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-medium text-[var(--color-ink)]">
                Browse Playlists by Year
              </h3>
            </div>

            {/* Year Selector Tabs */}
            {availableYears.length > 0 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                  type="button"
                  onClick={() => setSelectedYearFilter('All')}
                  className={`press px-4 py-2 rounded-full font-display text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap ${
                    selectedYearFilter === 'All'
                      ? 'bg-[var(--color-slate-deep)] text-white shadow-md'
                      : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  All Years
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
                          : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
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

          {/* Playlist Cards Grid */}
          {filteredPlaylists.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPlaylists.map((pl) => {
                const originalIndex = playlists.indexOf(pl)
                const isCurrentlyActive = originalIndex === activePlaylistIndex
                const directWatchUrl = getPlaylistWatchUrl(pl.url)

                return (
                  <motion.div
                    key={`${pl.year}-${pl.title}-${originalIndex}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <TiltCard
                      className={`group relative rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full ${
                        isCurrentlyActive
                          ? 'border-[var(--color-brand-red)] ring-2 ring-[var(--color-brand-red)]/20'
                          : 'border-stone-100'
                      }`}
                    >
                      {/* Card Thumbnail / Header */}
                      <div
                        onClick={() => handleSelectPlaylist(originalIndex, true)}
                        className="relative aspect-[16/10] bg-stone-900 overflow-hidden cursor-pointer"
                      >
                        <FallbackImage
                          src={pl.thumb || '/sermons/sunday-service-2026.jpg'}
                          alt={pl.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

                        {/* Year Badge */}
                        <span className="absolute top-3.5 left-3.5 bg-[var(--color-brand-red)] text-white text-xs font-display font-bold px-3 py-1 rounded-full shadow-md tracking-wide">
                          {pl.year}
                        </span>

                        {/* Series Tag */}
                        <span className="absolute top-3.5 right-3.5 bg-black/50 backdrop-blur-md text-white/90 text-[11px] font-display font-medium px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
                          <ListVideo size={12} /> Playlist
                        </span>

                        {/* Play Action Trigger */}
                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-white/90 text-[var(--color-brand-red)] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-brand-red)] group-hover:text-white">
                            <PlayCircle size={32} />
                          </div>
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <h4
                            onClick={() => handleSelectPlaylist(originalIndex, true)}
                            className="font-serif text-xl font-medium text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-brand-red)] transition-colors leading-snug cursor-pointer"
                          >
                            {pl.title}
                          </h4>

                          {pl.description && (
                            <p className="text-xs sm:text-sm text-stone-500 line-clamp-3 leading-relaxed mb-4">
                              {pl.description}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 mt-4">
                          <span className="text-xs font-display font-medium text-stone-400">
                            {pl.year} Series
                          </span>

                          <a
                            href={directWatchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="press text-stone-700 hover:text-[var(--color-brand-red)] text-xs font-display font-semibold inline-flex items-center gap-1.5 transition-colors"
                            title="Open on YouTube"
                          >
                            Watch on YouTube <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
              <ListVideo className="text-stone-400 mx-auto mb-3" size={40} />
              <h4 className="font-serif text-xl text-[var(--color-ink)] mb-1">No Playlists Found</h4>
              <p className="text-sm text-stone-500 mb-6">
                No playlists are currently listed for year {selectedYearFilter}.
              </p>
              <button
                type="button"
                onClick={() => setSelectedYearFilter('All')}
                className="press bg-[var(--color-slate-deep)] text-white text-xs font-display font-semibold px-5 py-2.5 rounded-full"
              >
                Show All Years
              </button>
            </div>
          )}
        </section>

        {/* ----------------------------------------------------------------- */}
        {/* YouTube Channel Subscription Banner                               */}
        {/* ----------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 sm:mt-28 rounded-3xl bg-gradient-to-r from-[var(--color-slate-deep)] via-[#221811] to-[var(--color-slate-deep)] p-8 sm:p-12 text-white border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-red)] text-white flex items-center justify-center shrink-0 shadow-lg">
              <Youtube size={36} />
            </div>
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-1.5">
                Subscribe on YouTube
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
              Subscribe to Channel <ExternalLink size={15} />
            </a>
          </MagneticElement>
        </motion.div>
      </div>
    </motion.div>
  )
}
