import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Brendo Dutra | Especialista em IA',
        short_name: 'Brendo Dutra',
        description: 'Portfolio de Brendo Dutra - Especialista em Inteligência Artificial e Desenvolvimento de Soluções Inovadoras',
        theme_color: '#000000',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait',
        lang: 'pt-BR',
        icons: [
          {
            src: 'favicon.svg',
            sizes: '32x32',
            type: 'image/svg+xml'
          },
          {
            src: 'logo192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: 'logo512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', '@mui/material', 'framer-motion']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material', 'framer-motion'],
  },
}); 