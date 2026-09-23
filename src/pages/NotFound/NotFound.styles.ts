import { Box, Stack, styled, Typography } from '@mui/material';

export const NotFoundWrapper = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    padding: theme.variables.layout.pagePadding,

    height: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: theme.colors.primary[600],
}));

export const NotFoundCard = styled(Stack)(({ theme }) => ({
    maxWidth: theme.variables.layout.contentMaxWidth,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.variables.radius.xl,
    backgroundColor: `${theme.palette.background.paper}CC`,
    backdropFilter: 'blur(1rem)',
    boxShadow: theme.variables.shadows.card,
    gap: theme.variables.spacing.md,

    position: 'relative',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 1,
    width: '90%',
    padding: theme.functions.pxToRem(32),
}));

export const NotFoundImg = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,

    width: '100%',
    maxWidth: theme.functions.pxToRem(640),
    height: 'auto',
})) as typeof Box;

export const NotFoundHeading = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.extraBold,
    fontSize: theme.functions.pxToRem(80),
    lineHeight: 1,
}));

export const NotFoundSubHeading = styled(Typography)(({ theme }) => ({
    mt: theme.functions.pxToRem(4),
    fontWeight: theme.variables.fontWeight.bold,
}));

export const NotFoundDescription = styled(Typography)(({ theme }) => ({
    maxWidth: theme.functions.pxToRem(576),
}));

export const BtnBox = styled(Stack)(({ theme }) => ({
    gap: theme.functions.pxToRem(16),
}));
