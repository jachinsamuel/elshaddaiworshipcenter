const CHANNEL_ID = 'UCn1wxSEJnA_rU4a3JdCYmwg'
const CHANNEL_HANDLE = '@elshaddaiworshipcenter'

let cache = {
  timestamp: 0,
  data: null,
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
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

async function verifyVideoLive(videoId) {
  if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return { isLive: false }

  try {
    const res = await fetchWithTimeout(`https://www.youtube.com/watch?v=${videoId}`, {}, 5000)
    if (!res || !res.ok) return { isLive: false }

    const data = await res.text()

    // If stream has ended or is upcoming, it is NOT live right now
    if (data.includes('"endTimestamp"') || data.includes('"isUpcoming":true')) {
      return { isLive: false }
    }

    let isLive = false
    let title = ''

    const pMatch = data.match(/ytInitialPlayerResponse\s*=\s*(\{.+?\});/)
    if (pMatch) {
      try {
        const player = JSON.parse(pMatch[1])
        const lb = player.microformat?.playerMicroformatRenderer?.liveBroadcastDetails
        if (lb && lb.isLiveNow === true) {
          isLive = true
        } else if (player.videoDetails?.isLive === true && !lb?.endTimestamp) {
          isLive = true
        }
        title = player.videoDetails?.title || ''
      } catch {}
    }

    if (!isLive && data.includes('"isLiveNow":true')) {
      isLive = true
    }

    if (!title) {
      const metaTitle =
        data.match(/<meta property="og:title" content="([^"]+)"/) ||
        data.match(/<meta name="title" content="([^"]+)"/)
      if (metaTitle) title = metaTitle[1].replace(' - YouTube', '').trim()
    }

    return {
      isLive,
      videoId: isLive ? videoId : null,
      title: isLive ? title : null,
    }
  } catch {
    return { isLive: false }
  }
}

export async function checkLiveStatus(handle = CHANNEL_HANDLE, channelId = CHANNEL_ID) {
  const now = Date.now()
  if (cache.data && now - cache.timestamp < 45 * 1000) {
    return cache.data
  }

  const candidates = new Set()

  // 1. Fetch channel RSS feed (fastest, most reliable, never blocked by datacenter)
  try {
    const rssRes = await fetchWithTimeout(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      {},
      4000
    )
    if (rssRes && rssRes.ok) {
      const xml = await rssRes.text()
      const matches = xml.matchAll(/<yt:videoId>([a-zA-Z0-9_-]{11})<\/yt:videoId>/g)
      let count = 0
      for (const m of matches) {
        candidates.add(m[1])
        count++
        if (count >= 2) break
      }
    }
  } catch {}

  // 2. Fetch /live page
  try {
    const liveRes = await fetchWithTimeout(
      `https://www.youtube.com/${handle}/live`,
      { redirect: 'follow' },
      4000
    )
    if (liveRes && liveRes.ok) {
      const html = await liveRes.text()
      const canMatch = html.match(
        /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/
      )
      if (canMatch) candidates.add(canMatch[1])

      const vMatch = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
      if (vMatch && html.includes('"isLiveNow":true')) {
        candidates.add(vMatch[1])
      }
    }
  } catch {}

  // 3. Verify each candidate video strictly
  for (const candidateId of candidates) {
    const status = await verifyVideoLive(candidateId)
    if (status.isLive) {
      cache = { timestamp: now, data: status }
      return status
    }
  }

  const result = { isLive: false, videoId: null, title: null }
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
