import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vite-movies/',
  plugins: [vue(), vueJsx(), svgLoader()],
  resolve: {
    extensions : [
      '*', '.js', '.vue', '.json', '.scss'
    ],
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
         additionalData: `@import "./src/styles/index.scss";`
      },
    },
  },
})
