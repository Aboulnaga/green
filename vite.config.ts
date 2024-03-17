import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:
    process.env.VITE_GREEN_URL === "production"
      ? "https://its-green.vercel.app"
      : "http://localhost:5173",
});
