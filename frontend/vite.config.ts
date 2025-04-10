/// <reference types="node" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're running locally
const isLocal = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: isLocal
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
        },
        port: 5173,
      }
    : undefined, // No custom server config on Azure
});
