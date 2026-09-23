import { List, styled } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,
    padding: theme.variables.spacing.md,
    maxHeight: `calc(100vh - ${theme.variables.layout.navbarHeight})`,

    width: '100%',
    backgroundColor: theme.colors.primary[50],
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));
