// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      'coverage/**',
      'eslint.config.mjs',
      'jest.config.mjs',
      'test-openai.ts',
      'prisma/seed.ts',
    ],
  },
  eslint.configs.recommended,
  {
    extends: [...tseslint.configs.strict],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.eslint.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-deprecated': 'error',
    },
  },
  prettier,
  // Jest rules for test files only
  {
    files: ['tests/**/*.ts'],
    plugins: {
      jest: jestPlugin,
    },
    ...jestPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
);
