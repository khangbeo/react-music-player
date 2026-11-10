import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" keeps the built site working from any static host or subpath,
// not just a domain root.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
