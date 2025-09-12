import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
	plugins: [viteSingleFile()],
	build: {
		target: "esnext",
		modulePreload: true,
		cssMinify: true,
		outDir: "dist",
		assetsDir: ".",
		emptyOutDir: true,
	},
});
