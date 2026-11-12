import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración pensada para un frontend estático y fácil de mantener.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'recursos',
  },
})
