import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  // Next.js + TS rules (quality/best practices)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Ignore build/deps/generated
  { ignores: [".next/**", "node_modules/**", "src/generated/**", "prisma/generated/**"] },

  // Your project-specific logic rules (keep formatting to Prettier)
  {
    rules: {
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }]
    }
  },

  // Turn off ESLint’s stylistic rules that conflict with Prettier
  ...compat.extends("prettier"),
];
