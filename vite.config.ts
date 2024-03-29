import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

console.log(process.env);
// https://vitejs.dev/config/
export default defineConfig(() => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "VITE_") };
  console.log(process.env);

  return {
    base: process.env.NODE_ENV == "development" ? "/" : process.env.VITE_URL,
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
