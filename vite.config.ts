import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ✅ 반드시 추가
  build: {
    outDir: "dist", // ✅ 빌드 출력 폴더 명시
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "./index.html", // ✅ 진입점 명시
      },
    },
  },
});
