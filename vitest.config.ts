import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		setupFiles: "./test/setup.ts",
		env: loadEnv("test", process.cwd(), ""),
	},
});
