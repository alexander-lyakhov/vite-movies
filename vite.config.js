import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'
import { configEnv, loadEnv } from 'vite'

export default function (configEnv) {
  process.env = {
    ...process.env,
    ...loadEnv(configEnv.mode, process.cwd(), '')
  }

  return defineConfig({
    base: process.env.VITE_APP_BASE_URL,
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
}

