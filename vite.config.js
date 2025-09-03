import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],

  //  define: {
  //     // Provide an explicit app-level constant derived from an env var.
  //     __APP_ENV__: JSON.stringify(env.APP_ENV),
  //   }
  
})
