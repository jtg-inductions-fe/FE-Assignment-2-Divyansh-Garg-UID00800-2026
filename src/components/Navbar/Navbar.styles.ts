import { alpha, AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    height: theme.variables.layout.navbarHeight,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,

    boxShadow: 'none',
}));

export const NavigationBar = styled(Toolbar)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    height: theme.variables.layout.navbarHeight,
    maxWidth: theme.variables.layout.contentMaxWidth,
    paddingLeft: theme.variables.spacing.md,
    paddingRight: theme.variables.spacing.md,

    width: '100%',
}));

export const HomeLinkWrapper = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.sm,

    flexShrink: 0,
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',

    '& .MuiSvgIcon-root': {
        fontSize: theme.variables.iconSize.xl,
        color: theme.palette.primary.dark,
    },
})) as typeof Button;

export const Brand = styled(Typography)(({ theme }) => ({
    fontWeight: theme.variables.fontWeight.bold,

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

export const NavLinks = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.xs,

    marginLeft: 'auto',

    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

export const StyledNavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.secondary,
    borderRadius: theme.variables.radius.pill,
    paddingLeft: theme.variables.spacing.md,
    paddingRight: theme.variables.spacing.md,
    fontSize: theme.variables.fontSize.sm,

    textTransform: 'none',

    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.04),
    },

    '&.active': {
        color: theme.palette.primary.main,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        fontWeight: theme.variables.fontWeight.semiBold,
    },

    [theme.breakpoints.down('md')]: {
        minHeight: theme.variables.spacing.xxl,
        paddingLeft: theme.variables.spacing.md,
        paddingRight: theme.variables.spacing.md,
        fontSize: theme.variables.fontSize.md,

        width: '50%',
    },
})) as typeof Button;

export const StyledLogoutButton = styled(StyledNavButton)(({ theme }) => ({
    color: theme.palette.error.main,

    '&:hover': {
        color: theme.palette.error.main,
        backgroundColor: alpha(theme.palette.error.main, 0.08),
    },
})) as typeof Button;
