import { Box, Stack, styled } from '@mui/material';

export const CountContainer = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '32px',
    gap: '10px',

    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
    },
}));

export const CountBox = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.pill,
    flex: 1,

    backgroundColor: theme.colors.secondary[50],
    border: `2px solid ${theme.colors.primary[100]}`,
}));

export const Count = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.sm,
    borderRadius: theme.variables.radius.pill,
    transition: theme.variables.transitions.normal,
    width: '100%',
    textWrap: 'nowrap',

    '&:hover': {
        backgroundColor: theme.colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        padding: theme.variables.spacing.sm,
    },
}));
