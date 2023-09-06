import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
const defaultConfig = {
  plugins: [react()],
}

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    const isDev = mode === 'development'

    return {
      ...defaultConfig,
      server: {
        proxy: {
          '/v1': {
            target: isDev ? 'https://127.0.0.1:8080' : 'https://f997a554a1.execute-api.us-west-1.amazonaws.com/latest',
            changeOrigin: isDev,
            secure: !isDev,
            ws: true,
            configure: (proxy) => {
              proxy.on('error', (err) => {
                console.log('proxy error', err);
              });
              proxy.on('proxyReq', (req) => {
                console.log('Sending Request to the Target:', req.method, req.url);
              });
              proxy.on('proxyRes', (proxyRes, req) => {
                console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
              });
            },
          }
        }
      }
    }
  } else {
    return defaultConfig
  }
})
