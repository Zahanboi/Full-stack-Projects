import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        const src = './_redirects';
        const dest = './dist/_redirects';
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log('✅ Copied _redirects to dist folder');
        } else {
          console.warn('⚠️ _redirects file not found');
        }
      }
    }
  ],
  build: {
    outDir: 'dist'
  }
})
