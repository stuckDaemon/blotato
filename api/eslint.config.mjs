const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/', 'dist/', 'coverage/', 'eslint.config.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname, // Use __dirname instead of import.meta.dirname
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Enforce import order
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'never',
        },
      ],

      'prettier/prettier': 'error',
    },
  },
];
