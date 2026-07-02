// Single source of truth for the weekly service schedule. Both the
// "Next Service" badge (Services page) and the "Live Now" detection
// (Home page) read from this so the two never drift out of sync.
//
// The raw data lives in src/content/services.json using human-friendly
// values (weekday names, "HH:MM" times) so it's editable through the
// Decap CMS admin panel without anyone touching this file. This module
// converts that friendly data into the day-index/minute math the
// scheduling logic needs.
import rawServicesFile from '../content/services.json'

const rawServices = rawServicesFile.services

const DAY_INDEX = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
}

const ACCENT_COLOR = {
  royal: 'var(--color-royal)',
  red: 'var(--color-brand-red)',
  gold: 'var(--color-gold)',
}

function timeToMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

function formatTimeLabel(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour12 = h % 12 === 0 ? 12 : h % 12
  return `${hour12}:${String(m).padStart(2, '0')} ${period}`
}

export const SCHEDULE = rawServices.map((s) => ({
  id: s.id,
  day: DAY_INDEX[s.day],
  dayLabel: s.day,
  title: s.title,
  start: timeToMinutes(s.start_time),
  end: timeToMinutes(s.end_time),
  timeLabel: `${formatTimeLabel(s.start_time)} – ${formatTimeLabel(s.end_time)}`,
  note: s.note,
  image: s.image,
  accent: ACCENT_COLOR[s.accent] || ACCENT_COLOR.royal,
}))

export function getNextServiceId(now = new Date()) {
  const nowDay = now.getDay()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  let best = null
  let bestDelta = Infinity

  for (const s of SCHEDULE) {
    const dayDelta = (s.day - nowDay + 7) % 7
    let totalDelta = dayDelta * 1440 + (s.start - nowMinutes)
    const isOngoing = dayDelta === 0 && nowMinutes >= s.start && nowMinutes <= s.end
    if (isOngoing) totalDelta = -1
    if (totalDelta < 0 && !isOngoing) totalDelta += 7 * 1440
    if (totalDelta < bestDelta) {
      bestDelta = totalDelta
      best = s.id
    }
  }
  return best
}

// Returns the service currently in progress, or null if none is live
// right now. Used to switch the homepage between a "Watch Live" link
// and an embedded live player automatically, with no manual toggling.
export function getLiveService(now = new Date()) {
  const nowDay = now.getDay()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  return SCHEDULE.find((s) => s.day === nowDay && nowMinutes >= s.start && nowMinutes <= s.end) ?? null
}
