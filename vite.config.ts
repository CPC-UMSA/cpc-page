import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/node' {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  build: {
    target: 'esnext',
    minify: false,
  },
  ssr: {
    noExternal: ['@juki-team/base-ui', '@ably/spaces'],
  },
  server: {
    watch: {
      usePolling: true,
    },
    port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : 3080,
    allowedHosts: [ 'www.local.umsa.club' ],
  },
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
});
