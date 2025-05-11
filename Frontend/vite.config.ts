import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/calculate': {
        target: 'https://api.mrfaf.info',
        changeOrigin: true,
        secure: false,
        // <-- strip /calculate off the front, so /calculate → ''
        rewrite: (path) => path.replace(/^\/calculate/, ''),
      },
    },
  },
})
