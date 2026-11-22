import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // همین‌جا به Vite می‌گوییم «@/» یعنی پوشه src
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
