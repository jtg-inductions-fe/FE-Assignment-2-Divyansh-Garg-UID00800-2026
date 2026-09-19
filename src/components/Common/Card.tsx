import { colors } from '@theme';
import { Link, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Card = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    padding: theme.variables.spacing.xl,
    gap: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,

    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.gray[50],
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const CardLogo = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    borderRadius: theme.variables.radius.lg,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: theme.variables.iconSize.xxl,
    height: theme.variables.iconSize.xxl,

    '& .MuiSvgIcon-root': {
        fontSize: theme.variables.iconSize.xl,
    },
}));

export const CardLink = styled(Link)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.extraBold,

    fontSize: '14px',
    color: colors.primary[900],
})) as typeof Link;

export const CardMain = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,

    backgroundColor: colors.white,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',

        alignItems: 'stretch',
    },
}));

export const CardHeader = styled(Box)(({ theme }) => ({
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,
    ...theme.mixins.flexBetween,

    background: `linear-gradient(
        135deg,
        ${colors.primary[50]} 0%,
        ${colors.white} 70%
    )`,

    borderBottom: `1px solid ${colors.primary[100]}`,

    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
}));

export const Label = styled(Typography)(({ theme }) => ({
    marginRight: theme.variables.spacing.sm,

    color: colors.secondary[800],
    display: 'inline',
    wordBreak: 'break-word',
}));

export const Value = styled(Typography)(() => ({
    color: colors.secondary[700],
}));
