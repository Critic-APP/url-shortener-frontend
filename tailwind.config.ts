import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          base: "#FAEEE7",
          header: "#222222",
          text: "#2A2A2A",
          button: "#FF8BA7",
        },
      },
      boxShadow: {
        right: "var(--shadow-right)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
