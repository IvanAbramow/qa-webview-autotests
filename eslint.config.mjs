import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import _import from 'eslint-plugin-import';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import todoLinkRule from './eslint-plugin-todo-link.js';
import maxLinesPerClass from './eslint-plugin-max-lines-per-class.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'scripts/**/*',
      '**/package.json',
      '**/package-lock.json',
      '**/default.json',
      '**/*.md',
      'node_modules/*',
      '**/type-check.mjs',
      'coverage/*',
      'eslint*',
      'bin/**/*',
      'dist/**/*',
      'index.js',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/typescript'
    )
  ),
  {
    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      'todo-link': todoLinkRule,
      'max-lines-per-class': maxLinesPerClass,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        require: 'readonly',
        module: 'readonly',
        global: 'readonly',
        RequestListener: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
        page: 'readonly',
        __filename: 'readonly',
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: './tsconfig.json',
        extraFileExtensions: ['.json'],
      },
    },

    settings: {
      'import/parser': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },

      'import/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      // Equivalents for trailingComma
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'only-multiline',
        },
      ],

      'max-lines-per-class/max-lines-per-class': ['warn', { max: 300 }],
      'todo-link/todo-link': 'error',

      'max-params': ['error', 3],
      'no-use-before-define': [
        'error',
        {
          functions: false,
          classes: false,
          variables: false,
          allowNamedExports: false,
        },
      ],

      'no-duplicate-imports': 'warn',
      curly: ['error', 'all'],

      'import/no-duplicates': [
        'error',
        {
          'prefer-inline': true,
        },
      ],

      'import/order': [
        'error',
        {
          'newlines-between': 'always',
        },
      ],

      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'error',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'local',
          args: 'after-used',
          ignoreRestSiblings: false,
        },
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE', 'snake_case'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          format: ['camelCase'],
          types: ['function'],
        },
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: null,
        },
        {
          selector: 'function',
          format: ['camelCase'],
        }
      ],

      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSInterfaceDeclaration',
          message:
            'Interfaces are only allowed in the types directory for converted from JSON schemas.',
        },
      ],

      'no-empty': 'warn',
      'no-cond-assign': ['error', 'always'],

      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
        },
      ],

      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'export',
        },
        {
          blankLine: 'always',
          prev: 'import',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'import',
          next: 'import',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'let',
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: 'const',
        },
        {
          blankLine: 'always',
          prev: 'const',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: 'const',
        },
        {
          blankLine: 'always',
          prev: 'let',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: 'let',
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: 'if',
        },
        {
          blankLine: 'always',
          prev: 'if',
          next: '*',
        },
      ],

      'padded-blocks': [
        'error',
        {
          blocks: 'never',
          classes: 'never',
          switches: 'never',
        },
      ],

      'lines-around-comment': [
        'error',
        {
          beforeBlockComment: false,
          allowBlockStart: true,
          allowObjectStart: true,
        },
      ],

      'object-curly-spacing': ['error', 'always'],
      'newline-before-return': 'error',
      'object-shorthand': 'error',
      'lines-between-class-members': ['error', 'always'],
      semi: ['error', 'always'],
      'no-return-await': 'error',
    },
  },
  {
    files: ['types/**/*.ts'],

    rules: {
      'no-restricted-syntax': 'off',
    },
  },
];
