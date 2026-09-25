import { Box, IconButton, Stack, styled, Typography } from '@mui/material';

export const ProfileCard = styled(Box)(() => ({
    width: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const ProfileUsername = styled(Typography)(({ theme }) => ({
    color: theme.colors.primary[900],
    marginRight: '5px',
    display: 'inline',
}));

export const ProfileCardHeaderTop = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.md,

    [theme.breakpoints.down('sm')]: {
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
        padding: theme.variables.spacing.sm,
        gap: '5px',
    },
}));

export const ProfileMainTop = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.md,

    alignItems: 'flex-start',
    flex: 1,
}));

export const StyledIcon = styled(IconButton)(({ theme }) => ({
    marginBottom: '5px',
    border: `1px solid ${theme.colors.primary[100]}`,
    padding: '2px',
})) as typeof IconButton;
