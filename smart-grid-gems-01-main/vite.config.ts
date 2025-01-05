import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  build: {
    rollupOptions: {
      external: []
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  optimizeDeps: {
    include: ['react-dropzone', 'pdfjs-dist/build/pdf.worker.mjs']
  }
}));