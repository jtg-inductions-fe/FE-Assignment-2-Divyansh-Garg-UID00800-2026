import { Box, Stack, styled } from '@mui/material';
import { colors } from '@theme';

export const CountContainer = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    paddingLeft: '32px',
    paddingRight: '32px',
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

    backgroundColor: colors.secondary[50],
    border: `2px solid ${colors.primary[100]}`,

    '&:hover': {
        border: `2px solid ${colors.secondary[500]}`,
        background: colors.white,
    },
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
        backgroundColor: colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        padding: theme.variables.spacing.sm,
    },
}));
