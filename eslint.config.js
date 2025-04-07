import eslint from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import typescript from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/', 'android/', 'ios/', 'dist/', 'build/'],
  },
  eslint.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          typescript: true,
          tsx: true,
        },
      },
    },
    plugins: {
      react,
      'react-native': reactNative,
      '@typescript-eslint': typescript,
      prettier,
      import: importPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'lf',
        },
      ],
      'no-global-assign': 'warn',
      'no-use-before-define': ['error', { variables: false }],
      'react/prop-types': ['off', { ignore: ['navigation', 'navigation.navigate'] }],
      'react-hooks/exhaustive-deps': 'off',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
          bundledDependencies: false,
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/'],
        },
      },
    },
  },
];
