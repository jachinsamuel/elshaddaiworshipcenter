import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { checkLiveStatus } from './api/youtube-live.js'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-and-admin-handlers',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/youtube-live') {
            res.setHeader('Content-Type', 'application/json')
            res.setHeader('Access-Control-Allow-Origin', '*')
            try {
              const result = await checkLiveStatus('@elshaddaiworshipcenter')
              res.statusCode = 200
              res.end(JSON.stringify(result))
            } catch (err) {
              res.statusCode = 500
              res.end(JSON.stringify({ isLive: false, error: err.message }))
            }
            return
          }

          if (req.url === '/admin' || req.url === '/admin/') {
            req.url = '/admin/index.html'
          }
          next()
        })
      },
    },
  ],
})
