import { Box, Button, Drawer, IconButton, styled } from '@mui/material';

export const MobileMenuTrigger = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.dark,

    display: 'none',
    minWidth: 0,
    padding: 0,

    [theme.breakpoints.down('md')]: {
        display: 'flex',
    },

    '& .MuiSvgIcon-root': {
        fontSize: theme.variables.iconSize.xl,
    },
}));

export const MobileDrawer = styled(Drawer)(() => ({
    '& .MuiDrawer-paper': {
        width: '80%',
        backgroundColor: 'red',
        scrollbarWidth: 'none',
    },
}));

export const MobileDrawerContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,

    width: '100%',
    height: '100%',
}));

export const MobileMenuHeader = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    height: theme.variables.layout.navbarHeight,
    paddingLeft: theme.variables.spacing.md,
    paddingRight: theme.variables.spacing.md,

    '& .MuiSvgIcon-root': {
        fontSize: theme.variables.iconSize.xl,
        color: theme.palette.primary.dark,
    },
}));

export const MobileCloseButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.text.primary,

    '& .MuiSvgIcon-root': {
        fontSize: theme.variables.iconSize.xl,
    },

    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.action.hover,
    },
}));

export const MobileNavigationList = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    gap: theme.variables.spacing.xs,
    padding: theme.variables.spacing.md,

    justifyContent: 'flex-start',
}));
