import { Box, styled } from '@mui/material';

export const Content = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    justifyContent: 'flex-start',
    width: '100%',
    maxWidth: theme.variables.layout.contentMaxWidth,
    height: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    padding: theme.variables.spacing.xl,
    gap: theme.variables.spacing.xl,
    zIndex: 1,
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));
