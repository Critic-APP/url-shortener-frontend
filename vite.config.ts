import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base:
    process.env.NODE_ENV == "development"
      ? "/"
      : process.env.RAILWAY_PUBLIC_DOMAIN,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
