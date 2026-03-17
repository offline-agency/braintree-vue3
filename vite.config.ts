import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      entryRoot: 'src',
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
      insertTypesEntry: true,
    }),
    {
      name: 'copy-dcts',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'dist/braintree-vue3.d.ts'),
          resolve(__dirname, 'dist/braintree-vue3.d.cts'),
        )
      },
    },
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BraintreeVue3',
      formats: ['es', 'cjs'],
      fileName: (format) =>
        format === 'es' ? 'braintree-vue3.js' : 'braintree-vue3.cjs',
    },
    rollupOptions: {
      external: ['vue', 'braintree-web'],
      output: {
        globals: {
          vue: 'Vue',
          'braintree-web': 'braintree',
        },
      },
    },
    sourcemap: true,
    minify: false,
  },
})
