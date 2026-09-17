import { colors } from '@/theme/colors';
import { Link, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pxToRem } from '@theme/functions';

export const Card = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    width: '100%',
    padding: theme.variables.spacing.xl,
    gap: theme.variables.spacing.md,
    textAlign: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: theme.variables.radius.xl,
    boxShadow: theme.variables.shadows.card,
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
}));

export const CardFooter = styled(Typography)(() => ({
    textAlign: 'center',
    color: colors.primary[900],
}));

export const CardLink = styled(Link)(() => ({
    textDecoration: 'none',
    color: colors.primary[900],
    padding: 0,
    marginBottom: pxToRem(24),
})) as typeof Link;
