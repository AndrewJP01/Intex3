/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ command }) => {
  const isDev = command === 'serve';

  return {
    plugins: [react(), tailwindcss()],
    server: isDev
      ? {
          https: {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
          },
          port: 5173,
        }
      : undefined,
  };
});
