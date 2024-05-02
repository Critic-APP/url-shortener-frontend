import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    compression({ include: /\.(html|xml|js|css|json|txt|ico|svg|ttf)$/ }),
    // compression({
    //   algorithm: "brotliCompress",
    //   include: /\.(html|xml|js|css|json|txt|ico|svg|ttf)$/,
    // }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
