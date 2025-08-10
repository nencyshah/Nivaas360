import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: isDev
        ? {
            "/api": {
              target: "http://localhost:3000", // Backend in local dev
              secure: false,
              changeOrigin: true,
            },
          }
        : undefined, // No proxy in production
    },
    define: {
      __API_URL__: JSON.stringify(
        isDev
          ? "http://localhost:3000" // Local backend
          : "https://real-estate-backend.onrender.com" // Render backend
      ),
    },
    plugins: [
      react(),
      isDev && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
