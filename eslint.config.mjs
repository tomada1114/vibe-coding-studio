import nextVitals from "eslint-config-next/core-web-vitals"
import nextTypeScript from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    rules: {
      "@next/next/no-img-element": "off",
      "prefer-const": "off",
      // Prevent console.log in production code
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
    },
  },
]

export default eslintConfig
