import antfu from "@antfu/eslint-config"
import pluginRouter from "@tanstack/eslint-plugin-router"

export default antfu({
  react: true,
  formatters: true,
  stylistic: {
    quotes: "double",
    semi: false,
  },
  ignores: [
    "**/*.gen.ts",
  ],
  rules: {
    "array-callback-return": "off",
    // Effect uses many of them
    "no-lone-blocks": "off",
    "no-empty": "off",
    // Don't insert `new` into `extends Data.TaggedError` declarations.
    "unicorn/throw-new-error": "off",
  },
}, {
  files: [
    "tests/e2e/**/*.ts",
  ],
  rules: {
    "test/consistent-test-it": "off",
  },
}, {
  files: [
    "tests/**/*.ts",
  ],
  rules: {
    "no-console": "off",
  },
}, pluginRouter.configs["flat/recommended"])
