import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: '@/config', replacement: path.resolve(__dirname, './config') },
        { find: '@/data', replacement: path.resolve(__dirname, './data') },
        { find: '@/lib', replacement: path.resolve(__dirname, './lib') },
        { find: '@/store', replacement: path.resolve(__dirname, './store') },
        { find: '@', replacement: path.resolve(__dirname, './src') },
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
