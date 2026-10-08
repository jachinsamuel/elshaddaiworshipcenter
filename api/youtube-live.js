const CHANNEL_ID = 'UCn1wxSEJnA_rU4a3JdCYmwg'
const CHANNEL_HANDLE = '@elshaddaiworshipcenter'

let cache = {
  timestamp: 0,
  data: null,
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 6000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        ...(options.headers || {}),
      },
    })
    clearTimeout(id)
    return res
  } catch {
    clearTimeout(id)
    return null
  }
}

export async function checkLiveStatus(handle = CHANNEL_HANDLE, channelId = CHANNEL_ID) {
  const now = Date.now()
  if (cache.data && now - cache.timestamp < 30 * 1000) {
    return cache.data
  }

  let liveVideoId = null

  // 1. Check Channel /streams tab — accurately flags active live streams with THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE
  try {
    const res = await fetchWithTimeout(`https://www.youtube.com/${handle}/streams`, {}, 5000)
    if (res && res.ok) {
      const html = await res.text()
      const badgeIdx = html.indexOf('THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE')
      if (badgeIdx !== -1) {
        const snippet = html.substring(Math.max(0, badgeIdx - 800), Math.min(html.length, badgeIdx + 800))
        const targetMatch = snippet.match(/"animationActivationTargetId":"([a-zA-Z0-9_-]{11})"/)
        const vMatch = snippet.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
        liveVideoId = targetMatch?.[1] || vMatch?.[1] || null
      }
    }
  } catch {}

  // 2. Fallback check: /live page if /streams wasn't available
  if (!liveVideoId) {
    try {
      const liveRes = await fetchWithTimeout(`https://www.youtube.com/${handle}/live`, { redirect: 'follow' }, 5000)
      if (liveRes && liveRes.ok) {
        const html = await liveRes.text()
        if (html.includes('THUMBNAIL_OVERLAY_BADGE_STYLE_LIVE') || html.includes('"isLiveNow":true')) {
          const canMatch = html.match(
            /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/
          )
          const vMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
          liveVideoId = canMatch?.[1] || vMatch?.[1] || null
        }
      }
    } catch {}
  }

  if (!liveVideoId) {
    const result = { isLive: false, videoId: null, title: null }
    cache = { timestamp: now, data: result }
    return result
  }

  // 3. Fetch title using YouTube oEmbed (official public API, never blocked)
  let title = 'Live Worship Broadcast'
  try {
    const oembedRes = await fetchWithTimeout(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${liveVideoId}&format=json`,
      {},
      3000
    )
    if (oembedRes && oembedRes.ok) {
      const oembedData = await oembedRes.json()
      if (oembedData.title) title = oembedData.title
    }
  } catch {}

  const result = {
    isLive: true,
    videoId: liveVideoId,
    title,
  }

  cache = { timestamp: now, data: result }
  return result
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Cache-Control', 'public, s-maxage=30, max-age=30')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  try {
    const result = await checkLiveStatus(CHANNEL_HANDLE, CHANNEL_ID)
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(result))
  } catch (err) {
    res.statusCode = 500
    res.end(JSON.stringify({ isLive: false, error: err.message }))
  }
}
