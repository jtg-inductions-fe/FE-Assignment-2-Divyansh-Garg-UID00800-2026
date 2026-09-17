import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';
import { Card, Stack, styled, Typography } from '@mui/material';

export const LoginWrapper = styled(Card)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.variables.radius.md,
    backgroundColor: `${theme.palette.background.paper}F5`,
    boxShadow: theme.variables.shadows.card,
    padding: theme.variables.spacing.xxl,
    gap: theme.variables.spacing.xl,

    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: pxToRem(640),
    minHeight: `calc(70vh - ${theme.variables.layout.navbarHeight})`,
}));

export const LoginHeader = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'center',
    width: '100%',
}));

export const LoginHeading = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.bold,

    textAlign: 'center',
}));

export const LoginSubheading = styled(Typography)(() => ({
    textAlign: 'center',
    width: '80%',
    color: colors.primary[900],
}));

export const LoginMainSection = styled(Stack)(({ theme }) => ({
    alignItems: 'end',
    gap: theme.variables.spacing.sm,
    width: '100%',
}));
