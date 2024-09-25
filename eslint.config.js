import antfu from '@antfu/eslint-config'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default antfu(
    {
        // Enable stylistic formatting rules
        // stylistic: true,
        // Or customize the stylistic rules
        stylistic: {
            'indent': 4, // 4, or 'tab'
            'quotes': 'single', // or 'double'
            'semi': false,
            'linebreak-style': ['error', 'unix'],
            'brace-style': '1tbs',
            'comma-dangle': 'only-multiline',
        },
        typescript: true,
        svelte: true,
        ignores: [
            './fixtures',
            '.DS_Store',
            'node_modules',
            '/build',
            '/.svelte-kit',
            '/package',
            '.env',
            '.env.*',
            '!.env.example',
            'pnpm-lock.yaml',
            'package-lock.json',
            'yarn.lock',
            'bun.lockb',
        ],
    },
    {
        rules: {
            'style/brace-style': [
                'warn',
                '1tbs', // '1tbs', 'stroustrup', 'allman'
                { allowSingleLine: true },
            ],
            'style/comma-dangle': [
                'warn',
                'only-multiline', // 'always-multiline', 'only-multiline', 'always', 'never'
            ],
            'curly': ['warn', 'all'],
            'style/max-statements-per-line': ['warn', { max: 2 }],
            'no-console': 'off',
        },
    },
    {
        files: ['**/*.svelte'],
        rules: {
            'svelte/html-quotes': [
                'error',
                { prefer: 'double' },
            ],
            'svelte/max-attributes-per-line': [
                'error',
                {
                    multiline: 1,
                    singleline: 1,
                },
            ],
            'svelte/first-attribute-linebreak': [
                'error',
                {
                    multiline: 'below',
                    singleline: 'beside',
                },
            ],
        },
    },
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,svelte}'],
        ...jsxA11y.flatConfigs.recommended,
        languageOptions: {
            ...jsxA11y.flatConfigs.recommended.languageOptions,
        },
    },
)
