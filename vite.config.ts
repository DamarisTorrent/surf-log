import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/noaa': {
        target: 'https://www.ndbc.noaa.gov',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/noaa/, ''),
        secure: false,
      }
    }
  }
})
