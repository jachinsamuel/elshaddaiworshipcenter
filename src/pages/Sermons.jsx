import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ListVideo, Calendar, Youtube } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import FallbackImage from '../components/FallbackImage'
import Seo from '../components/Seo'
import MagneticElement from '../components/MagneticElement'
import pageHeaders from '../content/page-headers.json'
import playlistsData from '../content/playlists.json'
import settingsData from '../content/settings.json'
import { getPlaylistWatchUrl } from '../lib/youtube'

export default function Sermons() {
  const playlists = useMemo(() => {
    return Array.isArray(playlistsData?.playlists) ? playlistsData.playlists : []
  }, [])

  // Extract distinct years sorted descending
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(playlists.map((p) => String(p.year || '')).filter(Boolean)))
    return years.sort((a, b) => b.localeCompare(a))
  }, [playlists])

  const [selectedYearFilter, setSelectedYearFilter] = useState('All')

  // Filtered playlists list based on year tab
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
        {/* Top Header & Year Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ListVideo className="text-[var(--color-brand-red)]" size={20} />
              <p className="font-display text-xs font-semibold tracking-[0.25em] text-[var(--color-brand-red)] uppercase">
                YOUTUBE PLAYLISTS
              </p>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[var(--color-ink)]">
              Browse Playlists
            </h2>
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

        {/* ----------------------------------------------------------------- */}
        {/* Stacked Folder Playlist Cards Grid (4 Columns)                   */}
        {/* ----------------------------------------------------------------- */}
        {filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPlaylists.map((pl, index) => {
              const directWatchUrl = getPlaylistWatchUrl(pl.url)

              return (
                <motion.div
                  key={`${pl.year}-${pl.title}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
                  className="h-full"
                >
                  <a
                    href={directWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between h-full bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                  >
                    {/* Folder Stack Effect */}
                    <div className="relative pt-2.5 w-full">
                      {/* Top Back Tab Layer */}
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[76%] h-2.5 rounded-t-md bg-stone-700/80 border-t border-x border-white/20 transition-transform duration-300 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                      {/* Middle Back Layer */}
                      <div
                        className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[88%] h-2.5 rounded-t-lg bg-stone-800 border-t border-x border-white/30 transition-transform duration-300 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />

                      {/* Main Front Thumbnail */}
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 shadow-md">
                        <FallbackImage
                          src={pl.thumb || '/sermons/sunday-service-2026.jpg'}
                          alt={pl.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Gradient & Playlist badge */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 group-hover:opacity-40 transition-opacity" />

                        <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-display font-medium px-2 py-0.5 rounded-md flex items-center gap-1 border border-white/10 shadow-sm">
                          <ListVideo size={11} /> Playlist
                        </div>
                      </div>
                    </div>

                    {/* Card Content: Title & View Full Playlist Link */}
                    <div className="pt-4 flex-1 flex flex-col justify-between">
                      <h4 className="font-display font-bold text-stone-900 text-sm sm:text-base leading-snug tracking-tight uppercase line-clamp-2 group-hover:text-[var(--color-brand-red)] transition-colors mb-3">
                        {pl.title}
                      </h4>

                      <div className="mt-auto pt-1 flex items-center justify-between text-xs sm:text-sm font-medium text-stone-400 group-hover:text-stone-700 transition-colors">
                        <span>View full playlist</span>
                        <ExternalLink size={13} className="text-stone-400 group-hover:text-[var(--color-brand-red)] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </a>
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
