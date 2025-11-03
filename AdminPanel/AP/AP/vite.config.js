import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from `.env`
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __VITE_BACKEND_PATH__: JSON.stringify(env.VITE_BACKEND_PATH),
    },
  }
})