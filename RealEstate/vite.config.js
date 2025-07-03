import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': {//each time you see /api you aad http://localhost:3000 
        target: 'http://localhost:3000', // Adjust the target to your backend server
        secure: false,
      },
    },
  },
  plugins: [react(),
    tailwindcss()
  ],
  
     
})
