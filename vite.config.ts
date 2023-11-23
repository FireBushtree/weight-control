import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'path'
import usePluginImport from 'vite-plugin-importer'

// https://vitejs.dev/config/*
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      rules: [
        ['w-heat-number', { width: '80px' }],
        ['intake-block', { width: '120px', 'border-radius': '2px' }],
      ],
      shortcuts: {
        'heat-number': 'text-white font-800 flex justify-center',
        'bg-protein': 'bg-cyan-400',
        'bg-carbon': 'bg-yellow-400',
        'bg-fat': 'bg-rose-400',
        'bg-calorie': 'bg-emerald-300'
      },
    }),
    usePluginImport({
      libraryName: 'tdesign-react',
      libraryDirectory: 'es',
      customStyleName (name) {
        return `tdesign-react/es/${name}/style/index.css`
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
