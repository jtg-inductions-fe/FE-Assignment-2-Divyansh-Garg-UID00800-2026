import { Box, Stack, styled, Typography } from '@mui/material';

export const ProfileCard = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,

    width: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.primary[100]}`,
}));

export const ProfileUsername = styled(Typography)(({ theme }) => ({
    display: 'inline',
    color: theme.colors.primary[800],
}));

export const ProfileCardHeaderTop = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.md,

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignContent: 'baseline',
    },
}));

export const ProfileCardTopHeaderInner = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.xs,
    alignItems: 'flex-start',

    [theme.breakpoints.down('md')]: {
        alignItems: 'flex-start',
    },
}));

export const CaptionBox = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    padding: theme.variables.spacing.md,
    background: theme.colors.gray[100],
    borderRadius: theme.variables.radius.pill,
    width: '100%',

    [theme.breakpoints.down('sm')]: {
        ...theme.mixins.flexCenterCol,
        gap: '5px',
    },
}));

export const ProfileMainTop = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.md,

    alignItems: 'flex-start',
    flex: 1,
}));
