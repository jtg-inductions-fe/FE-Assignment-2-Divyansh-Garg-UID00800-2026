import type { ThemeOptions } from '@mui/material/styles';

import { pxToRem } from './functions';
import { variables } from './variables';

export const typography: ThemeOptions['typography'] = {
    fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Arial',
        'sans-serif',
    ].join(','),

    h1: {
        fontSize: pxToRem(40),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.sm,
        letterSpacing: '-0.02em',
    },

    h2: {
        fontSize: pxToRem(32),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
        letterSpacing: '-0.015em',
    },

    h3: {
        fontSize: pxToRem(28),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
    },

    h4: {
        fontSize: pxToRem(24),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.lg,
    },

    h5: {
        fontSize: pxToRem(20),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.lg,
    },

    h6: {
        fontSize: pxToRem(18),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.xl,
    },

    body1: {
        fontSize: pxToRem(16),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.xxl,
    },

    body2: {
        fontSize: pxToRem(14),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.xl,
    },

    button: {
        fontSize: pxToRem(14),
        fontWeight: variables.fontWeight.semiBold,
        textTransform: 'none',
    },

    caption: {
        fontSize: pxToRem(12),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.lg,
    },
};
