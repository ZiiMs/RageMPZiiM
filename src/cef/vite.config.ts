import { defineConfig } from 'vite';
import { path as jetpackPath } from 'fs-jetpack';

import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

const buildOutput = 'dist';
const sourcePath = path.resolve('src');

function resolvePath(pathParts) {
  return jetpackPath(...pathParts);
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: 'bridge.js',
          dest: '',
        },
      ],
    }),
  ],
  build: {
    outDir: 'D:/Servers/RageMP/ZRP/dist/client_packages/cef',
    // rollupOptions: {
    //   input: './bridge.tsx',
    //   output: {
    //     entryFileNames: 'bridge.js',
    //     dir: buildOutput,
    //   },
    // },
  },
});
