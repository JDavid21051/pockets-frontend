// @ts-check
import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import angular from 'angular-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      prettierConfig,
    ],
    processor: angular.processInlineTemplates,
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'krih',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'krih',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/no-output-rename': ['error'],
      '@angular-eslint/use-lifecycle-interface': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': ['error'],
      '@typescript-eslint/no-floating-promises': ['warn'],
      '@typescript-eslint/consistent-type-imports': ['error'],
      '@typescript-eslint/no-non-null-assertion': ['error'],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'private-field',
            '#private-field',
            'protected-field',
            'public-field',
            'field',
            'constructor',
            'private-set',
            'protected-set',
            'public-set',
            'private-get',
            'protected-get',
            'public-get',
            'private-method',
            'protected-method',
            'public-method',
          ],
          interfaces: ['signature', 'constructor', 'field', 'method'],
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['warn'],
      '@typescript-eslint/no-unsafe-call': ['warn'],
      '@typescript-eslint/no-unsafe-assignment': ['warn'],
      'prefer-template': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'no-var': 'error',
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
      prettierConfig,
    ],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {},
  },
]);
