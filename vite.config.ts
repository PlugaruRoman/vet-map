import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
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
    }
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
