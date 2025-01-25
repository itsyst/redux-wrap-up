import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional: Adds a shorthand alias for importing from the src directory
    },
  },
  server: {
    open: true, // Automatically opens the app in the browser when the dev server starts
  },
  build: {
    outDir: 'dist', // Output directory for production builds
    assetsDir: 'assets', // Directory for static assets in production
  },
  define: {
    'process.env': {} // Correct set up to handle environment variables
  }
})
