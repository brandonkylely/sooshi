import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
const defaultConfig = {
  // base: '/sooshi/',
  plugins: [react()],
};

export default defineConfig(({ command, mode }) => {
  if (command === "serve") {
    const isDev = mode === "development";

    return {
      ...defaultConfig,
      server: {
        proxy: {
          "/api": {
            target: "http://localhost:3001/",
            changeOrigin: isDev,
            secure: !isDev,
            ws: true,
            configure: (proxy) => {
              proxy.on("error", (err) => {
                console.log("proxy error", err);
              });
              proxy.on("proxyReq", (req) => {
                console.log(
                  "Sending Request to the Target:",
                  req.method,
                  req.url
                );
              });
              proxy.on("proxyRes", (proxyRes, req) => {
                console.log(
                  "Received Response from the Target:",
                  proxyRes.statusCode,
                  req.url
                );
              });
            },
          },
        },
      },
    };
  } else {
    return {
      ...defaultConfig,
      server: {
        proxy: {
          "/api": {
            target:
              "https://f997a554a1.execute-api.us-west-1.amazonaws.com/latest",
            changeOrigin: isDev,
            secure: !isDev,
            ws: true,
            configure: (proxy) => {
              proxy.on("error", (err) => {
                console.log("proxy error", err);
              });
              proxy.on("proxyReq", (req) => {
                console.log(
                  "Sending Request to the Target:",
                  req.method,
                  req.url
                );
              });
              proxy.on("proxyRes", (proxyRes, req) => {
                console.log(
                  "Received Response from the Target:",
                  proxyRes.statusCode,
                  req.url
                );
              });
            },
          },
        },
      },
    };
  }
});
