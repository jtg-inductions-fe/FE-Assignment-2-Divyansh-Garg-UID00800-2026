import { pxToRem } from './functions';

export const variables = {
    layout: {
        navbarHeight: pxToRem(80),
        contentMaxWidth: pxToRem(1900),
        pagePadding: pxToRem(24),
        sectionGap: pxToRem(32),
        logoutMenuWidth: pxToRem(320),
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

    iconSize: {
        sm: pxToRem(18),
        md: pxToRem(20),
        lg: pxToRem(24),
        xl: pxToRem(32),
        xxl: pxToRem(64),
    },

    fontSize: {
        xs: pxToRem(8),
        sm: pxToRem(18),
        md: pxToRem(24),
        lg: pxToRem(36),
    },

    transitions: {
        slow: '350ms ease',
        normal: '250ms ease',
        fast: '150ms ease',
    },
} as const;
