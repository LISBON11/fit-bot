// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default tseslint.config(
    {
        ignores: ['**/dist/**', '**/node_modules/**', 'coverage/**', 'jest.config.ts'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    prettier,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            'prettier/prettier': 'error',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/consistent-type-imports': 'error',
        },
    },
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
    },
);
