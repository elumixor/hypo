import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/hypo/",
  server: { host: true }, // test on phone via LAN
  plugins: [tsconfigPaths()],
  build: {
    target: "es2019",
    sourcemap: false,
  },
});
