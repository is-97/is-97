import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          vue: ['vue', 'vue-router', 'pinia'],
          gsap: ['gsap'],
          icons: ['@fortawesome/fontawesome-free'],
          vendor: ['@vercel/analytics/vue']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})