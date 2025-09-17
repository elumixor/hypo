import { resolve } from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  base: "/hypo/",
  server: { host: true }, // test on phone via LAN
  plugins: [tsconfigPaths()],
  build: {
    target: "es2019",
    sourcemap: false,
  },
  define: {
    __DEV__: mode === 'development',
  },
  resolve: {
    alias: {
      "@engine": resolve(__dirname, "./engine"),
    },
  },
}));
