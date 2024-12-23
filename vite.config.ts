import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
const base = '/'
export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    VitePWA({
			registerType: 'autoUpdate',
			scope: '/new/',
			srcDir: 'src',
			strategies: 'generateSW',
			manifest: {
				name: 'java大学',
				short_name: 'java大学',
				scope: `${base}`,
				start_url: `${base}`,
				display: 'fullscreen',
				background_color: '#ffffff',
				theme_color: '#000000',
				icons: [
					{
						src: `${base}android-chrome-192x192.png`,
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: `${base}android-chrome-512x512.png`,
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
			devOptions: {
				// 开发环境是否开启 PWA
				enabled: true,
				type: 'module',
			},
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/107\.172\.134\.31:(8443|8080).*$/,
						handler: 'NetworkFirst',
						options: {
							cacheName: 'api-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24,
							},
						},
					},
					{
						urlPattern: /^https:\/\/javawork\.watering\.top.*\.html$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'html-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 7,
							},
						},
					},
					{
						urlPattern: /^https:\/\/javawork\.watering\.top.*\.js$/,
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'js-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 7,
							},
						},
					},
					{
						urlPattern: /^https:\/\/javawork\.watering\.top.*\.css$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'css-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 7,
							},
						},
					},
					{
						urlPattern: ({ request }) =>
							request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'images',
							expiration: {
								maxEntries: 60,
								maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
							},
						},
					},
				],
				globPatterns: [
					`${base}index.html`,
					`${base}favicon.ico`,
					`${base}manifest.json`,
					`${base}android-chrome-192x192.png`,
					`${base}android-chrome-512x512.png`,
				],
				skipWaiting: true,
				clientsClaim: true,
			},
		}),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
