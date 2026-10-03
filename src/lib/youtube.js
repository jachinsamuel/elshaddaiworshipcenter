/**
 * Extracts a YouTube playlist embed URL from various link formats.
 * Accepts full URLs, watch links with list params, embed links, or raw playlist IDs.
 */
export function getPlaylistEmbedUrl(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return null
  const trimmed = urlOrId.trim()

  // If already an embed URL
  if (trimmed.includes('youtube.com/embed/videoseries?list=') || trimmed.includes('youtube-nocookie.com/embed/videoseries?list=')) {
    return trimmed
  }

  // Check URL query parameters
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
    const listId = parsed.searchParams.get('list')
    if (listId) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(listId)}`
    }
  } catch {
    // Not a valid standard URL
  }

  // Regex fallback for query string match
  const match = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(match[1])}`
  }

  // Raw playlist ID (typically starting with PL or similar and 10+ chars)
  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(trimmed)}`
  }

  return null
}

/**
 * Normalizes any playlist link into a clean YouTube watch URL.
 */
export function getPlaylistWatchUrl(urlOrId) {
  if (!urlOrId || typeof urlOrId !== 'string') return 'https://www.youtube.com'
  const trimmed = urlOrId.trim()
  if (trimmed.includes('youtube.com/playlist?list=')) return trimmed

  const match = trimmed.match(/[?&]list=([a-zA-Z0-9_-]+)/)
  if (match) {
    return `https://www.youtube.com/playlist?list=${match[1]}`
  }

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) {
    return `https://www.youtube.com/playlist?list=${trimmed}`
  }

  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`
}
