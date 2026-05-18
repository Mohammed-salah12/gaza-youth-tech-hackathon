import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendPort = Number.parseInt(process.env.VITE_BACKEND_PORT || '4000', 10)
const backendTarget = `http://127.0.0.1:${Number.isInteger(backendPort) ? backendPort : 4000}`

export default defineConfig(({ command }) => ({
  base: command === 'build' ? './' : '/',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: backendTarget,
      },
      '/uploads': {
        target: backendTarget,
      },
    },
  },
}))
