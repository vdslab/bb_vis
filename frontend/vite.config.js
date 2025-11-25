import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import replace from "@rollup/plugin-replace";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    plugins: [
      {
        ...replace({
          delimiters: ["", ""],
          preventAssignment: false,
          values: isProd
            ? {
                "{/* devonly:start */}": "{/*",
                "{/* devonly:end */}": "*/}",
                "// devonly:start": "/*",
                "// devonly:end": "*/",
              }
            : {},
        }),
        enforce: "pre",
        apply() {
          return isProd;
        },
      },
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },
  };
});
