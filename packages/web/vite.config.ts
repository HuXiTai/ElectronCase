import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ vue({
    template: {
      // 添加以下内容
      compilerOptions: {
        isCustomElement: tag => tag.startsWith("cropper-"),
      },
    },
  }) ],
  server: { host: "0.0.0.0" },
  base: "./",
  resolve: {
    alias: { "@": resolve(__dirname, "./src") },
  },
});
