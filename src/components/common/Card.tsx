import { colors } from '@theme/colors';
import { Link, Stack, styled } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem } from '@theme/functions';

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

export const CardLink = styled(Link)(() => ({
    textDecoration: 'none',
    color: colors.primary[900],
    padding: 0,
    marginBottom: pxToRem(24),
})) as typeof Link;
