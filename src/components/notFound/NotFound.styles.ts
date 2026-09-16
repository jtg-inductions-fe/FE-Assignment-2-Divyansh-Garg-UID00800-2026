import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';
import { Box, Stack, styled, Typography } from '@mui/material';

export const NotFoundWrapper = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    padding: theme.variables.layout.pagePadding,

    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.primary[600],
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
    padding: pxToRem(32),
}));

export const NotFoundImg = styled(Box)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,

    width: '100%',
    maxWidth: pxToRem(640),
    height: 'auto',
})) as typeof Box;

export const NotFoundHeading = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.extraBold,
    fontSize: pxToRem(80),
    lineHeight: 1,
}));

export const NotFoundSubHeading = styled(Typography)(({ theme }) => ({
    mt: pxToRem(4),
    fontWeight: theme.variables.fontWeight.bold,
}));

export const NotFoundDescription = styled(Typography)(() => ({
    maxWidth: pxToRem(576),
}));

export const BtnBox = styled(Stack)(() => ({
    gap: pxToRem(16),
}));
