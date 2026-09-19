import type { ThemeOptions } from '@mui/material/styles';

import { pxToRem } from './functions';
import { variables } from './variables';
import { colors } from './colors';

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
        letterSpacing: variables.spacing.xs,
        color: colors.primary[900],
    },

    h2: {
        fontSize: pxToRem(32),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
        letterSpacing: variables.spacing.sm,
        color: colors.primary[800],
    },

    h3: {
        fontSize: pxToRem(28),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
        color: colors.primary[700],
    },

    h4: {
        fontSize: pxToRem(24),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.lg,
        color: colors.primary[600],
    },

    h5: {
        fontSize: pxToRem(20),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.lg,
        color: colors.primary[500],
    },

    h6: {
        fontSize: pxToRem(18),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.xl,
        color: colors.primary[400],
    },

    body1: {
        fontSize: pxToRem(16),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.xxl,
        color: colors.secondary[900],
    },

    body2: {
        fontSize: pxToRem(14),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.xl,
        colors: colors.secondary[800],
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
        color: colors.secondary[500],
    },
};
