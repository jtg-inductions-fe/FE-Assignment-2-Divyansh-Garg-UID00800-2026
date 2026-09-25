import { Link, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Card = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    padding: theme.variables.spacing.xl,
    gap: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,
    backgroundColor: theme.colors.gray[50],

    width: '100%',
    textAlign: 'center',
    overflow: 'scroll',
    scrollbarWidth: 'none',

    [theme.breakpoints.down('sm')]: {
        padding: '10px',
    },
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
    color: theme.colors.primary[900],
})) as typeof Link;

export const CardMain = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,

    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: theme.colors.white,
}));

export const CardHeader = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.xl,
    padding: theme.variables.spacing.xl,
    width: '100%',

    background: `linear-gradient(
        135deg,
        ${theme.colors.primary[50]} 0%,
        ${theme.colors.white} 70%
    )`,

    borderBottom: `1px solid ${theme.colors.primary[100]}`,
    borderRadius: theme.variables.radius.xl,
}));

export const CardRelativeHeader = styled(Stack)(() => ({
    position: 'relative',
    width: '100%',
}));

export const Label = styled(Typography)(({ theme }) => ({
    color: theme.colors.secondary[800],
    display: 'inline',
    wordBreak: 'break-word',
    textAlign: 'right',
    fontWeight: '100',
    marginRight: '5px',
}));

export const Value = styled(Typography)(({ theme }) => ({
    color: theme.colors.secondary[700],
}));

export const CardPill = styled(Typography)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    background: theme.colors.primary[100],
    padding: theme.variables.spacing.sm,
    borderRadius: theme.variables.radius.pill,
    border: `2px solid ${theme.colors.primary[900]}`,
    gap: theme.variables.spacing.xs,
    height: 'fit-content',

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        paddingLeft: theme.variables.spacing.md,
        paddingRight: theme.variables.spacing.md,
        gap: 0,
    },
}));
