import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relatywne sciezki do zasobow - wymagane przy embeddingu w WordPress
  base: './',
});
