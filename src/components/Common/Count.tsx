import { Box, Stack, styled } from '@mui/material';
import { colors } from '@theme';

export const CountBox = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.xs,
    borderRadius: theme.variables.radius.pill,

    backgroundColor: colors.primary[50],
    border: `1px solid ${colors.primary[100]}`,

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

export const Count = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.pill,
    transition: theme.variables.transitions.normal,

    minWidth: '100px',

    '&:hover': {
        backgroundColor: colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        padding: theme.variables.spacing.sm,

        flex: 1,
        minWidth: 0,
    },
}));
