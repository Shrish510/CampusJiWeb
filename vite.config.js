import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are loaded with relative paths (crucial for GitHub Pages & Capacitor)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
