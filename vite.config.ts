// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🛠️ اضبط الـ base على اسم الريبو
export default defineConfig({
  base: '/Jehad-web/', // <-- مهم جدًا
  plugins: [react()],
})
