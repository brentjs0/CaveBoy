const nodeEnv = process.env.NODE_ENV.trim();

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': nodeEnv === 'production' ? 'warn' : 'off',
    'no-debugger': nodeEnv === 'production' ? 'warn' : 'off',
    'quotes': ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true
      }
    ]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true,
      },
    },
  ],
};
