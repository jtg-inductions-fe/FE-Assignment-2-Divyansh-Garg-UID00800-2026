import { fileURLToPath, URL } from 'url';

import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    test: {
        globals: true,
        setupFiles: './src/tests/setup.ts',
        environment: 'jsdom',
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
            '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
            '@pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
            '@redux': fileURLToPath(new URL('./src/redux', import.meta.url)),
            '@router': fileURLToPath(new URL('./src/router', import.meta.url)),
            '@tests': fileURLToPath(new URL('./src/tests', import.meta.url)),
            '@theme': fileURLToPath(new URL('./src/theme', import.meta.url)),
            '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        },
    },
});
