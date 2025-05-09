import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/calculate': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // <-- strip /calculate off the front, so /calculate → ''
        rewrite: (path) => path.replace(/^\/calculate/, ''),
      },
    },
  },
})
