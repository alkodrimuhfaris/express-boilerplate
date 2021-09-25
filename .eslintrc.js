module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "warn",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    'no-unused-vars': 'warn',
    'no-nested-ternary': 'off',
    camelcase: 0,
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        jsxSingleQuote: false,
        bracketSpacing: false,
        trailingComma: 'all',
        endOfLine: 'auto',
      },
    ],
  },
};
