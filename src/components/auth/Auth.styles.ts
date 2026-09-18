import { Card, Stack, styled } from '@mui/material';

export const LoginWrapper = styled(Card)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.variables.radius.md,
    backgroundColor: `${theme.palette.background.paper}F5`,
    boxShadow: theme.variables.shadows.card,
    padding: theme.variables.spacing.xxl,
    gap: theme.variables.spacing.xl,

    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    maxWidth: '640px',
    textAlign: 'center',
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const LoginHeader = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'center',
    width: '100%',
}));

export const LoginMainSection = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'end',
    width: '100%',
}));
