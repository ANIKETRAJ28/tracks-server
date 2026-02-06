import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default [
  // Base recommended TS rules
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,js}'],

    plugins: {
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },

    languageOptions: {
      parser: tseslint.parser,
    },

    settings: {
      'import/resolver': {
        typescript: {},
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },

    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'], // side effects (e.g. import 'dotenv/config')
            ['^@?\\w'], // packages (react, lodash, @types, etc.)
            ['^\\.'], // relative imports
          ],
        },
      ],

      'simple-import-sort/exports': 'error',
      'import/no-duplicates': 'error',
    },
  },
];
