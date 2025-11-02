import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), vitePluginManusRuntime()];

export default defineConfig({
  base: '/RemontZBT/',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      ".manus.local",
    ],
    headers: {
      "Cache-Control": "no-store",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        configure: (proxy, options) => {
          const httpProxy = proxy;
          httpProxy.on("proxyReq", (proxyReq, req, res) => {
            // Add original request information to headers
            if (req.headers.host) {
              proxyReq.setHeader("X-Original-Host", req.headers.host);
            }
          });
          httpProxy.on("error", (err, req, res) => {
            console.error("Proxy error:", err);
          });
        },
      },
      "/api/chat": {
        target: "http://localhost:3001",
        changeOrigin: true,
        ws: true,
        configure: (proxy, options) => {
          const httpProxy = proxy;
          httpProxy.on("proxyReq", (proxyReq, req, res) => {
            // Add original request information to headers
            if (req.headers.host) {
              proxyReq.setHeader("X-Original-Host", req.headers.host);
            }
          });
          httpProxy.on("error", (err, req, res) => {
            console.error("Proxy error:", err);
          });
        },
      },
      "/assets": {
        target: "http://localhost:3001",
        changeOrigin: true,
        bypass: (req, res, options) => {
          // List of directories that should be served by Vite instead of proxied
          const viteDirectories = [
            "/assets",
            "/client",
            "/src",
            "/@vite",
            "/@react-refresh",
            "/@fs",
          ];
          const shouldBypass = viteDirectories.some((dir) => {
            const result =
              req.url?.startsWith(dir) &&
              (req.url?.includes(".css") ||
                req.url?.includes(".js") ||
                req.url?.includes(".ts") ||
                req.url?.includes(".tsx") ||
                req.url?.includes(".map") ||
                req.url?.includes("@react-refresh") ||
                req.url?.includes("?t="));
            if (result) {
              console.log(`[Vite] Serving static file:`, req.url);
            }
            return result;
          });
          // Also check for attached_assets directory
          if (req.url?.startsWith("/attached_assets/")) {
            const assetPath = path.join(
              import.meta.dirname,
              req.url.replace(/^\//g, "")
            );
            if (fs.existsSync(assetPath)) {
              console.log(`[Vite] Serving attached asset:`, req.url);
              return true;
            }
          }
          return shouldBypass;
        },
      },
    },
  },
});
