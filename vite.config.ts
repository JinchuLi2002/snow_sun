import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/snow_sun/',
    server: { port: 3000, host: '0.0.0.0' },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      // to anyone who might clone this, do NOT set keys here, they will be visible to public.
      // if you want to use gemini you'll want to modify the code.
    },
    resolve: { alias: { '@': path.resolve(__dirname, '.') } },
  };
});

