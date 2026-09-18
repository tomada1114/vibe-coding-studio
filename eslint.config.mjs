import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    settings: {
      // ESLint 10 removed context.getFilename(), which eslint-plugin-react's
      // (bundled by eslint-config-next) React-version auto-detection still
      // calls. Pinning the version explicitly skips that code path.
      // https://github.com/jsx-eslint/eslint-plugin-react#configuration
      react: {
        version: "19",
      },
    },
    rules: {
      "@next/next/no-img-element": "off",
      "prefer-const": "off",
      // Prevent console.log in production code
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
  },
]

export default eslintConfig
