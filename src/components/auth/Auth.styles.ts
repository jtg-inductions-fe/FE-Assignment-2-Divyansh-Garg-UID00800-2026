import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';
import { Box, Button, Card, Stack, styled, Typography } from '@mui/material';

export const LoginPageContent = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    minHeight: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
    padding: theme.variables.layout.pagePadding,

    position: 'relative',
    background: colors.primary[50],
    overflowY: 'clip',
    overflowX: 'clip',
}));

export const LoginCard = styled(Card)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.variables.radius.xl,
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

export const LoginCardHeader = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.sm,

    alignItems: 'center',
    width: '100%',
}));

export const LoginCardLogo = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    borderRadius: theme.variables.radius.lg,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: theme.variables.iconSize.xxl,
    height: theme.variables.iconSize.xxl,
}));

export const LoginCardHeading = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.bold,

    textAlign: 'center',
}));

export const LoginCardSubheading = styled(Typography)(() => ({
    textAlign: 'center',
    width: '80%',
    color: colors.primary[900],
}));

export const LoginCardMainSection = styled(Stack)(({ theme }) => ({
    alignItems: 'end',
    gap: theme.variables.spacing.sm,
    width: '100%',
}));

export const LoginCardPATGenerateBtn = styled(Button)(() => ({
    color: colors.primary[900],
    padding: 0,
    marginBottom: pxToRem(24),
})) as typeof Button;

export const LoginCardFooter = styled(Typography)(() => ({
    textAlign: 'center',
    color: colors.primary[900],
}));
