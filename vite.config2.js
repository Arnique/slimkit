import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const path = require('path');
const fs = require('fs');
const isProd = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/slimkit/',
  build: {
    outDir: 'docs'
  },
  plugins: [
    vue(),
    svgLoader({ 
      svgoConfig: {
        plugins:[
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ]
      } 
    }),
    isProd ? viteStaticCopy({
      targets: [
        {
          src: './src/assets/svg',
          dest: 'assets/'
        }
      ]
    }) : () => {},
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_global.scss";`
      }
    }
  },
})
