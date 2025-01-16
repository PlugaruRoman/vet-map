import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [react(), svgr(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: 'src/main.tsx',
      name: 'VetMapWidget',
      fileName: (format) => `map-widget.${format}.js`,
      formats: ['umd']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: [
      {
        find: 'src',
        replacement: '/src'
      }
    ]
  },
  define: {
    'process.env': {}
  }
})
