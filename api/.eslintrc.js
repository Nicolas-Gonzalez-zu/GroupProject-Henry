module.exports = {
  env: {
    node: 1,
    browser: false,
    es6: true,
  },
  extends: ['plugin:node/recommended', 'airbnb-base', 'prettier', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['node', 'prettier', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    'no-console': 'off',
  },
};
