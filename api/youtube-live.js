import https from 'https'

let cache = {
  timestamp: 0,
  data: null,
}

export function checkLiveStatus(handle = '@elshaddaiworshipcenter') {
  const now = Date.now()
  if (cache.data && now - cache.timestamp < 45 * 1000) {
    return Promise.resolve(cache.data)
  }

  return new Promise((resolve) => {
    const url = `https://www.youtube.com/${handle}/live`
    const req = https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const loc = res.headers.location
          const vMatch = loc.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
          if (vMatch) {
            const result = { isLive: true, videoId: vMatch[1] }
            cache = { timestamp: now, data: result }
            return resolve(result)
          }
        }

        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          const isLive =
            data.includes('"isLive":true') ||
            data.includes('"status":"LIVE"') ||
            data.includes('BADGE_STYLE_TYPE_LIVE_NOW') ||
            data.includes('"isLiveNow":true')

          let videoId = null
          const canMatch = data.match(
            /<link rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"/
          )
          if (canMatch) {
            videoId = canMatch[1]
          } else {
            const vMatch = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/)
            if (vMatch && isLive) {
              videoId = vMatch[1]
            }
          }

          let title = ''
          const titleMatch = data.match(/<meta name="title" content="([^"]+)"/)
          if (titleMatch) title = titleMatch[1]

          const result = {
            isLive: !!(isLive && videoId),
            videoId: isLive ? videoId : null,
            title: isLive ? title : null,
          }

          cache = { timestamp: now, data: result }
          resolve(result)
        })
      }
    )

    req.on('error', (err) => {
      resolve({ isLive: false, error: err.message })
    })

    req.setTimeout(8000, () => {
      req.destroy()
      resolve({ isLive: false, timeout: true })
    })
  })
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
    const result = await checkLiveStatus('@elshaddaiworshipcenter')
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    res.end(JSON.stringify(result))
  } catch (err) {
    res.statusCode = 500
    res.end(JSON.stringify({ isLive: false, error: err.message }))
  }
}
