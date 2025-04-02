import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/jehad-web/' // Replace with your repository name (include the leading and trailing slash)
})
