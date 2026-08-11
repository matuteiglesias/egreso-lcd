import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["components/resolver-client.tsx"],
    rules: {
      // The resolver intentionally restores a version-checked localStorage session only
      // after hydration, then persists later state back to the same external store.
      // This keeps the server/client first render identical and contains the exception
      // to the one component that owns the browser-only session boundary.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([".next/**", "next-env.d.ts"]),
]);
