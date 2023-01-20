import { fileURLToPath, URL } from 'url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import analyze from 'rollup-plugin-analyzer'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

const path = require('path');
const fs = require('fs');

const isProd = process.env.NODE_ENV === 'production';

const r1 = /\.(vue)$/;
const r2 = /<style\s+lang="scss">([\s\S]*)<\/style>/gmi;
let styles = '';

function writeStyle(fp, css) {
  const name = fp.split('/').slice(-1)[0];
  styles += `/*${name}*/\n${css}\n`;
  console.log('[EXTRACT:SCSS]', `${name}`)
}

function copyStyle () {
  return {
    name: 'copy-style',
    resolveId (source) {
      return source === 'virtual-module' ? source : null
    },
    transform(src, id) {
      if (r1.test(id)){
        r2.lastIndex = 0;
        const m = r2.exec(src);
        if (m) writeStyle(id, m[1]);
      }
    },
    renderStart (outputOptions, inputOptions) {
      const dir = path.resolve(outputOptions.dir, 'scss');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      const p = path.resolve(outputOptions.dir, 'scss', 'comps.scss');
      fs.writeFileSync(p, styles);
      console.log('[WRITE]', `created file: ${p}`);
    }
  }  
}

function cleanBuild (list = []) {
  return {
    name: 'clean-build',
    resolveId (source) {
      return source === 'virtual-module' ? source : null
    },
    renderStart (outputOptions, inputOptions) {
      const outDir = outputOptions.dir

      for(var d of list) {
        var p = path.resolve(outDir, d);
        if (!fs.existsSync(p)) continue;

        if (fs.lstatSync(p).isFile()) {
          fs.unlinkSync(p);
          console.log('[DEL]', `deleted file: ${p}`);
        } else {
          fs.rmdirSync(p, { recursive: true });
          console.log('[DEL]', `deleted dir: ${p}`);
        }
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/components/index.js'),
      name: 'SlimKit',
      fileName: (format) => `slimkit.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    isProd ? copyStyle() : () => {},
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
          src: './src/assets/scss',
          dest: ''
        }
      ]
    }) : () => {},
    isProd ? cleanBuild(['font', 'icons', 'favicon.ico']) : () => {},
    analyze({ summaryOnly: true })
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
