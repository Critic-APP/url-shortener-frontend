import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
console.log(process.env);

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV == "development" ? "/" : process.env.BASE_URL,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
