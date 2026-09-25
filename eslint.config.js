import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
    {
        ignores: ['dist', 'node_modules'],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx}'],

        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },

        plugins: {
            'react-hooks': reactHooks,
        },

        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            camelcase: ['warn'],
            'no-console': ['warn'],
            ...reactHooks.configs['recommended-latest'].rules,
        },
    },
    eslintPluginPrettier,
    eslintConfigPrettier,
];
