import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlayCircle, ExternalLink, ListVideo, Calendar, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import TiltCard from '../components/TiltCard'
import pageHeaders from '../content/page-headers.json'
import playlistsData from '../content/playlists.json'
import { getPlaylistEmbedUrl, getPlaylistWatchUrl } from '../lib/youtube'

// Load individual sermons from src/content/sermons/
const sermonModules = import.meta.glob('../content/sermons/*.json', { eager: true })
const SERMONS = Object.values(sermonModules)
  .map((m) => m.default)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function Sermons() {
  const playlists = useMemo(() => {
    return Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : []
  }, [])

  // Default to the first (latest) playlist
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(0)

  const activePlaylist = playlists[selectedPlaylistIndex] || playlists[0]
  const embedUrl = activePlaylist ? getPlaylistEmbedUrl(activePlaylist.url) : null
  const watchUrl = activePlaylist ? getPlaylistWatchUrl(activePlaylist.url) : 'https://youtube.com'

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <Seo
        title="Sermons & Playlists"
        description="Watch yearly sermon playlists, Sunday messages, and worship services from El Shaddai Worship Center, Nagercoil."
      />
      <PageHeader eyebrow="WATCH & LISTEN" title="Sermons & Media" image={pageHeaders.sermons} />

      {/* ------------------------------------------------------------- */}
      {/* 1. YouTube Playlists Section (Organized by Year: 2026, 2025...) */}
      {/* ------------------------------------------------------------- */}
      {playlists.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-16 sm:pt-20 pb-12 sm:pb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ListVideo className="text-[var(--color-brand-red)]" size={20} />
                <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-brand-red)] uppercase">
                  YEARLY ARCHIVE
                </p>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
                Sermons by Year
              </h2>
            </div>
            <p className="text-stone-600 text-sm max-w-md">
              Explore our full YouTube playlists organized by year. Watch any complete Sunday message series or worship service.
            </p>
          </div>

          {/* Year Selector Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-3 mb-8 no-scrollbar">
            {playlists.map((pl, idx) => {
              const isSelected = idx === selectedPlaylistIndex
              return (
                <button
                  key={`${pl.year}-${idx}`}
                  type="button"
                  onClick={() => setSelectedPlaylistIndex(idx)}
                  className={`press px-5 py-2.5 rounded-full font-display text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[var(--color-brand-red)] text-white shadow-md'
                      : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Calendar size={14} className={isSelected ? 'text-white' : 'text-stone-400'} />
                  {pl.year || 'Series'}
                </button>
              )
            })}
          </div>

          {/* Active Featured Playlist Player Card */}
          {activePlaylist && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlaylist.year + activePlaylist.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="bg-[var(--color-slate-deep)] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 mb-12"
              >
                <div className="grid lg:grid-cols-12 gap-0 items-center">
                  {/* Embedded YouTube Playlist Iframe */}
                  <div className="lg:col-span-7 bg-black aspect-video relative w-full">
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
                      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-stone-900">
                        <PlayCircle size={48} className="text-white/40 mb-3" />
                        <p className="text-sm text-white/70">Click below to watch directly on YouTube</p>
                      </div>
                    )}
                  </div>

                  {/* Playlist Details */}
                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[var(--color-brand-red)]/20 text-[var(--color-brand-red)] border border-[var(--color-brand-red)]/30 font-display text-xs font-bold uppercase tracking-wider mb-4">
                      <Sparkles size={13} />
                      {activePlaylist.year} Official Playlist
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mb-3 leading-snug">
                      {activePlaylist.title}
                    </h3>

                    {activePlaylist.description && (
                      <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6">
                        {activePlaylist.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-2 border-t border-white/10">
                      <a
                        href={watchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="press inline-flex items-center gap-2 bg-[var(--color-brand-red)] text-white font-display font-semibold text-xs sm:text-sm tracking-wide px-5 py-3 rounded-full hover:bg-red-700 transition-all shadow-lg"
                      >
                        <PlayCircle size={16} /> Open in YouTube <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Quick Browse All Playlists Bento Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {playlists.map((pl, idx) => {
              const isSelected = idx === selectedPlaylistIndex
              const plWatch = getPlaylistWatchUrl(pl.url)
              return (
                <div
                  key={`${pl.year}-${pl.title}-${idx}`}
                  onClick={() => setSelectedPlaylistIndex(idx)}
                  className={`group relative rounded-2xl overflow-hidden border p-5 sm:p-6 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[var(--color-brand-red)] shadow-lg ring-2 ring-[var(--color-brand-red)]/20'
                      : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display font-bold text-xs px-3 py-1 rounded-full bg-stone-100 text-stone-700 uppercase tracking-wider">
                      {pl.year}
                    </span>
                    <a
                      href={plWatch}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-stone-400 hover:text-[var(--color-brand-red)] transition-colors p-1"
                      title="Open on YouTube"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  <h4 className="font-serif text-lg font-medium text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-brand-red)] transition-colors">
                    {pl.title}
                  </h4>

                  {pl.description && (
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-4">
                      {pl.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 text-xs font-display font-semibold text-[var(--color-brand-red)]">
                    <PlayCircle size={15} />
                    {isSelected ? 'Currently Selected' : 'Click to Load Playlist'}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. Recent Individual Sermon Highlights                        */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 py-16 sm:py-24 border-t border-stone-200/60">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-brand-red)] section-eyebrow mb-2 uppercase">
            INDIVIDUAL HIGHLIGHTS
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-medium text-[var(--color-ink)]">
            Recent Messages
          </h2>
          <p className="text-stone-600 text-sm mt-3">
            Key sermon highlights, scriptures, and teachings from our head pastors and guest speakers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7">
          {SERMONS.map((s, i) => (
            <motion.div
              key={`${s.title}-${s.date}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-full h-full"
            >
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <TiltCard className="group rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-white cursor-pointer h-full">
                  <div className="relative aspect-video bg-stone-200 overflow-hidden">
                    <FallbackImage
                      src={s.thumb}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <PlayCircle
                        className="text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                        size={56}
                        strokeWidth={1.4}
                      />
                    </div>
                    {s.scripture && (
                      <span className="absolute top-3 left-3 bg-[var(--color-brand-red)] text-white text-xs font-display font-semibold px-2.5 py-1 rounded-full shadow">
                        {s.scripture}
                      </span>
                    )}
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-lg font-bold text-[var(--color-slate-deep)] mb-1.5 group-hover:text-[var(--color-brand-red)] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-stone-500">
                      {s.speaker} &middot; {formatDate(s.date)}
                    </p>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
