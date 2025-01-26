import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin([
    'VITE_BASE_URL_API',
    'VITE_BASE_USERS_URL_API'
  ])],
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
    'process.env': {},
    __APP_ENV__: JSON.stringify(process.env), // Global access to environment variables
  }
})
