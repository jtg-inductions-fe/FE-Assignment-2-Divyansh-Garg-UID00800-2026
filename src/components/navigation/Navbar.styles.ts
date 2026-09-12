import { colors } from '@theme/colors';
import { alpha, AppBar, Box, Button, IconButton, styled, Toolbar, Typography } from '@mui/material';

export const Header = styled(AppBar)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: theme.variables.layout.navbarHeight,

    backgroundColor: colors.gray[100],
    color: colors.gray[900],
}));

export const NavigationBar = styled(Toolbar)(({ theme }) => ({
    height: theme.variables.layout.navbarHeight,
    justifyContent: 'space-between',
    px: {
        xs: theme.variables.spacing.md,
        sm: theme.variables.spacing.lg,
        md: theme.variables.spacing.xl,
    },
    maxWidth: theme.variables.layout.contentMaxWidth,

    width: '100%',
}));

export const HomeLinkWrapper = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.sm,

    color: 'inherit',
    flexShrink: 0,
})) as typeof Box;

export const Brand = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.bold,
})) as typeof Typography;

export const NavLinks = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.xs,

    ml: 'auto',
})) as typeof Box;

export const StyledNavLinkButton = styled(Button)(({ theme }) => ({
    textTransform: 'none',
    color: theme.palette.text.secondary,
    borderRadius: theme.variables.radius.xl,
    paddingLeft: theme.variables.spacing.md,
    paddingRight: theme.variables.spacing.md,
    fontSize: theme.variables.fontSize.sm,

    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },

    '&.active': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        fontWeight: theme.variables.fontWeight.semiBold,
    },
})) as typeof Button;

export const ToggleButton = styled(IconButton)(({ theme }) => ({
    ml: 'auto',
    p: 0,
    fontSize: theme.variables.fontSize.lg,
}));
