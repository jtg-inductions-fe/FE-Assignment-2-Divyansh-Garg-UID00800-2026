import { Box, Stack, styled } from '@mui/material';
import { colors } from '@theme';

export const Grid = styled(Stack)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.variables.spacing.lg,
    padding: theme.variables.spacing.md,
    justifyContent: 'space-between',

    background: `linear-gradient(
        135deg,
        ${colors.primary[50]} 0%,
        ${colors.white} 70%
    )`,

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
    },
}));

export const GridEle = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.pill,
    backgroundColor: colors.gray[50],

    [theme.breakpoints.down('md')]: {
        padding: theme.variables.spacing.sm,
    },
}));
