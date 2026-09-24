import { Box, styled } from '@mui/material';

export const Content = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    height: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    padding: theme.variables.spacing.xl,
    gap: theme.variables.spacing.xl,

    zIndex: 1,
    width: '100%',
    maxWidth: theme.variables.layout.contentMaxWidth,
    overflow: 'scroll',
    scrollbarWidth: 'none',
    justifyContent: 'flex-start',

    [theme.breakpoints.up('lg')]: {
        width: '80%',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '10px',
    },
}));
