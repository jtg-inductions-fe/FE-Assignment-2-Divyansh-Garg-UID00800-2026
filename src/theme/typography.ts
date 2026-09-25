import type { ThemeOptions } from '@mui/material/styles';
import { functions } from './functions';
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
        fontSize: functions.pxToRem(40),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.sm,
        letterSpacing: variables.spacing.xs,
        color: colors.primary[900],
    },

    h2: {
        fontSize: functions.pxToRem(32),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
        letterSpacing: variables.spacing.sm,
        color: colors.primary[800],
    },

    h3: {
        fontSize: functions.pxToRem(28),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.md,
        color: colors.primary[700],
    },

    h4: {
        fontSize: functions.pxToRem(24),
        fontWeight: variables.fontWeight.bold,
        lineHeight: variables.lineHeight.lg,
        color: colors.primary[600],
    },

    h5: {
        fontSize: functions.pxToRem(20),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.lg,
        color: colors.primary[500],
    },

    h6: {
        fontSize: functions.pxToRem(18),
        fontWeight: variables.fontWeight.semiBold,
        lineHeight: variables.lineHeight.xl,
        color: colors.primary[400],
    },

    body1: {
        fontSize: functions.pxToRem(16),
        fontWeight: variables.fontWeight.extraBold,
        lineHeight: variables.lineHeight.xxl,
        color: colors.secondary[900],
    },

    body2: {
        fontSize: functions.pxToRem(14),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.xl,
        colors: colors.secondary[800],
    },

    button: {
        fontSize: functions.pxToRem(14),
        fontWeight: variables.fontWeight.semiBold,
        textTransform: 'none',
    },

    caption: {
        fontSize: functions.pxToRem(12),
        fontWeight: variables.fontWeight.regular,
        lineHeight: variables.lineHeight.lg,
        color: colors.secondary[500],
    },
};
