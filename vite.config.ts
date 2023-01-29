import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import path from 'path'
import usePluginImport from 'vite-plugin-importer'

// https://vitejs.dev/config/*
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({}),
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
