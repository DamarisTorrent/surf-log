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
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('[Vite Proxy] Error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('[Vite Proxy] Request:', req.method, req.url, '-> ', proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('[Vite Proxy] Response:', proxyRes.statusCode, 'for', req.url);
          });
        },
      }
    }
  }
})
