import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        // Ensure _redirects is copied to dist/
        fs.copyFileSync('_redirects', 'dist/_redirects');
      }
    }
  ],
  build: {
    outDir: 'dist'
  }
})
