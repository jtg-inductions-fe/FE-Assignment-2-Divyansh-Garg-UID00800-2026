import { Box, Stack, styled, Typography } from '@mui/material';

import { colors } from '@theme/colors';

export const ProfileCard = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,

    width: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    backgroundColor: colors.white,
    border: `1px solid ${colors.primary[100]}`,
}));

export const ProfileUsername = styled(Typography)(() => ({
    display: 'inline',
    color: colors.primary[800],
}));

export const ProfileCardHeaderTop = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.md,
}));

export const ProfileCardTopHeaderInner = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.xs,
    alignItems: 'flex-start',

    [theme.breakpoints.down('md')]: {
        alignItems: 'flex-end',
    },
}));

export const ProfileMainTop = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'flex-start',
    flex: 1,
}));
