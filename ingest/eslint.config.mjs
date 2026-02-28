import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['node_modules/', 'dist/', 'coverage/'],

    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: new URL('.', import.meta.url).pathname,
        sourceType: 'module',
      },
    },

    plugins: {
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort,
      prettier,
    },

    rules: {
      // ----------------
      // TypeScript
      // ----------------
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],

      // ----------------
      // Import Sorting
      // ----------------
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // ----------------
      // Formatting
      // ----------------
      'prettier/prettier': 'error',
    },
  },
];
