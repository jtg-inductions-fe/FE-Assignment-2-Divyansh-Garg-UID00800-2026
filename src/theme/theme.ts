import './theme.d';
import { createTheme } from '@mui/material/styles';

import { colors } from './colors';
import { typography } from './typography';
import { variables } from './variables';
import { mixins } from './mixins';

export const theme = createTheme({
    cssVariables: true,

    palette: {
        primary: {
            main: colors.primary[600],
            light: colors.primary[400],
            dark: colors.primary[800],
            contrastText: colors.white,
        },

        secondary: {
            main: colors.secondary[600],
            light: colors.secondary[400],
            dark: colors.secondary[800],
            contrastText: colors.white,
        },

        background: {
            default: colors.gray[50],
            paper: colors.white,
        },

        text: {
            primary: colors.gray[900],
            secondary: colors.gray[600],
        },

        divider: colors.gray[200],

        success: {
            light: colors.success[100],
            main: colors.success[600],
            dark: colors.success[800],
            contrastText: colors.white,
        },

        warning: {
            light: colors.warning[100],
            main: colors.warning[600],
            dark: colors.warning[800],
            contrastText: colors.white,
        },

        error: {
            light: colors.error[100],
            main: colors.error[600],
            dark: colors.error[800],
            contrastText: colors.white,
        },

        info: {
            light: colors.info[100],
            main: colors.info[600],
            dark: colors.info[800],
            contrastText: colors.white,
        },
    },

    typography,

    variables,

    mixins,
});
