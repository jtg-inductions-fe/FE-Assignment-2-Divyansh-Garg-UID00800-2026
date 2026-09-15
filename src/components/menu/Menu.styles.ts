import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
} from '@mui/material';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

export const MobileMenuTrigger = styled(Button)({
    padding: 0,
    minWidth: 0,
});

export const MobileDrawerContent = styled(Box)({
    width: '80vw',
    backgroundColor: colors.secondary[50],
});

export const MobileMenuHeader = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    paddingLeft: theme.variables.spacing.md,
    paddingRight: theme.variables.spacing.md,
    paddingTop: theme.variables.spacing.sm,
    paddingBottom: theme.variables.spacing.sm,
    height: theme.variables.layout.navbarHeight,
}));

export const MobileNavigationList = styled(List)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    height: `calc(100vh - ${pxToRem(81)})`,
    justifyContent: 'flex-start',
}));

export const MobileNavigationItem = styled(ListItem)(({ theme }) => ({
    ...theme.mixins.flexCenterCol,
    fontWeight: theme.variables.fontWeight.bold,
}));

export const MobileNavigationButton = styled(ListItemButton)(({ theme }) => ({
    gap: pxToRem(10),
    borderRadius: theme.variables.radius.pill,
})) as typeof ListItemButton;

export const MobileNavigationIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: theme.variables.spacing.xl,

    color: colors.secondary[900],
}));

export const MobileNavigationText = styled(ListItemText)(({ theme }) => ({
    fontSize: theme.variables.fontSize.md,

    color: colors.secondary[900],
    fontWeight: 'inherit',
}));

export const MobileActionEntry = styled(ListItem)(({ theme }) => ({
    padding: 0,
    justifyContent: 'center',
    marginTop: theme.variables.spacing.md,
}));

export const MobileActionButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.variables.spacing.sm,
    borderRadius: theme.variables.radius.pill,

    width: '50vw',
    minHeight: pxToRem(50),
    fontSize: pxToRem(18),
})) as typeof Button;
