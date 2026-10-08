import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Source entry is dev.html. `npm run build` bundles it into one self-contained index.html
// (see scripts/postbuild.mjs) that works on GitHub Pages and anywhere a static file can be hosted.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  server: { open: '/dev.html' },
  build: {
    assetsInlineLimit: 100000000,
    cssCodeSplit: false,
    rollupOptions: { input: 'dev.html' },
  },
});
