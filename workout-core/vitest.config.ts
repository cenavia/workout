import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.{test,spec}.ts", "src/**/*.{test,spec}.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.dto.ts", "src/**/index.ts"],
    },
  },
  resolve: {
    alias: {
      "@/shared": resolve(__dirname, "src/contexts/shared"),
      "@/test": resolve(__dirname, "tests"),
    },
  },
});
