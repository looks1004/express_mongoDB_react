import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({


  base: '/',

  css: {
    modules: {
      scopeBehaviour: 'global', // CSS 모듈이 활성화된 경우 글로벌 CSS로 변경
    },
  },

  server: {
    hmr: false,  // HMR 기능 비활성화
  },
  
  plugins: [react()],
})
