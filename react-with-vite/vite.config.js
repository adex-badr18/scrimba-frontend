import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/scrimba-frontend/react-with-vite/",
  plugins: [react()],
})
