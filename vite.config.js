/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
const path = require("path")
export default defineConfig({
  test: {
    setupFiles: ['./tests/config.ts'],
    environment: 'jsdom'
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/install.ts'),
      name: 'vcp',
      formats: ['es'],
      fileName: (format) => `vcp.${format}.ts`
    },
    rollupOptions: {
      external: ['vue', 'vueI18n', 'vue-demi',],
      output: {
        exports: 'named',
        globals: {
          'vue-demi': 'VueDemi',
          'vue': 'Vue',
        }
      }
    },
  },
  plugins: [
    libCss(),
    vue({
      style: true,
      css: true
    }),
    vueI18n({
      include: path.resolve(__dirname, 'src/assets/translations.ts'),
      globalSFCScope: true,
      compositionOnly: false,
    }),
  ],
  server: {
    port: 8080
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
