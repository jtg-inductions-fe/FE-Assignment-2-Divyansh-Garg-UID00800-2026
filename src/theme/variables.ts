import { pxToRem } from './functions';
import { colors } from './colors';

export const variables = {
    colors,

    layout: {
        navbarHeight: pxToRem(64),
        contentMaxWidth: pxToRem(1440),
        pagePadding: pxToRem(24),
        sectionGap: pxToRem(32),
    },

    radius: {
        xs: pxToRem(4),
        sm: pxToRem(6),
        md: pxToRem(8),
        lg: pxToRem(12),
        xl: pxToRem(16),
        pill: pxToRem(999),
    },

    shadows: {
        card: `0 ${pxToRem(2)} ${pxToRem(8)} rgba(15, 23, 42, 0.08)`,
    },

    spacing: {
        xs: pxToRem(4),
        sm: pxToRem(8),
        md: pxToRem(16),
        lg: pxToRem(24),
        xl: pxToRem(32),
        xxl: pxToRem(48),
    },

    fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
    },

    lineHeight: {
        sm: 1.2,
        md: 1.3,
        lg: 1.4,
        xl: 1.5,
        xxl: 1.6,
    },

    transitions: {
        slow: '350ms ease',
        normal: '250ms ease',
        fast: '150ms ease',
    },
} as const;
