import fs from 'fs'
import path from 'path'

function getGoogleSheetUrl() {
  if (process.env.GOOGLE_SHEETS_SCRIPT_URL) {
    return process.env.GOOGLE_SHEETS_SCRIPT_URL
  }
  if (process.env.VITE_GOOGLE_SHEETS_SCRIPT_URL) {
    return process.env.VITE_GOOGLE_SHEETS_SCRIPT_URL
  }

  // Attempt to read from src/content/contact.json
  try {
    const contactPath = path.resolve(process.cwd(), 'src/content/contact.json')
    if (fs.existsSync(contactPath)) {
      const data = JSON.parse(fs.readFileSync(contactPath, 'utf8'))
      return data.google_sheet_url || ''
    }
  } catch {
    // Silently fall back
  }

  return ''
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: 'Method not allowed' }))
    return
  }

  try {
    let body = req.body

    // Parse body if it came as a string or buffer
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body)
      } catch {
        // May be URL encoded
        const params = new URLSearchParams(body)
        body = Object.fromEntries(params.entries())
      }
    }

    const { name, email, phone, address, message } = body || {}

    if (!name || !email || !message) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }))
      return
    }

    const sheetUrl = getGoogleSheetUrl()

    if (!sheetUrl) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          success: false,
          error: 'Google Sheets Web App URL is not configured yet. Please configure it in the Admin Panel or environment variables.',
        })
      )
      return
    }

    // Forward to Google Apps Script Web App
    const payload = {
      name,
      email,
      phone: phone || '',
      address: address || '',
      message,
      timestamp: new Date().toISOString(),
    }

    // Use URLSearchParams for maximum compatibility with Google Apps Script doPost(e.parameter)
    const formParams = new URLSearchParams()
    for (const [key, val] of Object.entries(payload)) {
      formParams.append(key, String(val))
    }

    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formParams.toString(),
    })

    if (!response.ok && response.status !== 302) {
      const errText = await response.text()
      throw new Error(`Google Apps Script returned status ${response.status}: ${errText}`)
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, message: 'Message sent successfully.' }))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: false, error: err.message || 'Failed to submit to Google Sheets.' }))
  }
}
