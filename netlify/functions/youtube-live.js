import { checkLiveStatus } from '../../api/youtube-live.js'

export async function handler(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, s-maxage=30, max-age=30',
    'Content-Type': 'application/json',
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  try {
    const result = await checkLiveStatus('@elshaddaiworshipcenter')
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result),
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ isLive: false, error: err.message }),
    }
  }
}
