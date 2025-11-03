// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'
// import dotenv from 'dotenv'
// import { loadEnv } from 'vite'
// // https://vite.dev/config/

// export default defineConfig({
  
//   plugins: [react(),tailwindcss()],
//   define:{
//    __VITE_BACKEND_PATH__:JSON.stringify(VITE_BACKEND_PATH)
//   }
// })


import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from `.env`
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()
    ],
    define: {
      __VITE_BACKEND_PATH__: JSON.stringify(env.VITE_BACKEND_PATH),
      __VITE_VAPI_PUBLIC_KEY__:JSON.stringify(env.VAPI_PUBLIC_KEY),
      __VITE_VAPI_ASSISTANT_ID__:JSON.stringify(env.VAPI_ASSISTANT_ID)
    },
  }
})
