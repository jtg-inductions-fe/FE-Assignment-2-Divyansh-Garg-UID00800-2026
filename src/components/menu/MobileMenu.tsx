import { Close, GitHub, Login, Menu } from '@mui/icons-material';
import { Divider, Drawer, IconButton } from '@mui/material';
import { NavLink } from 'react-router';

import { useNavigationItems } from '@components/navigation/navigation';
import LogoutMenu from '@components/actionButtons/LogoutMenu';

import { useExpand } from '@app/hooks';

import {
    MobileActionButton,
    MobileActionEntry,
    MobileDrawerContent,
    MobileMenuHeader,
    MobileMenuTrigger,
    MobileNavigationButton,
    MobileNavigationIcon,
    MobileNavigationItem,
    MobileNavigationList,
    MobileNavigationText,
} from './Menu.styles';

import { variables } from '@theme/variables';
import { pxToRem } from '@theme/functions';

interface MobileMenuProps {
    isAuthenticated: boolean;
    currentPath: string;
}

const MobileMenu = ({ isAuthenticated, currentPath }: MobileMenuProps) => {
    const { open, handleOpen, handleClose } = useExpand();

    const navigationItems = useNavigationItems();

    const visibleNavigationItems = navigationItems.filter(
        (item) => !item.requiresAuth || isAuthenticated,
    );

    return (
        <>
            <MobileMenuTrigger onClick={handleOpen} aria-haspopup="dialog" aria-expanded={open}>
                <Menu
                    sx={(theme) => ({
                        fontSize: theme.variables.iconSize.xl,
                        color: theme.palette.primary.dark,
                    })}
                />
            </MobileMenuTrigger>

            <Drawer anchor="right" open={open} onClose={handleClose}>
                <MobileDrawerContent role="presentation">
                    <MobileMenuHeader>
                        <GitHub
                            sx={(theme) => ({
                                fontSize: theme.variables.iconSize.xl,
                                color: theme.palette.primary.dark,
                            })}
                        />

                        <IconButton onClick={handleClose} aria-label="Close navigation menu">
                            <Close
                                sx={(theme) => ({
                                    fontSize: theme.variables.iconSize.xl,
                                })}
                            />
                        </IconButton>
                    </MobileMenuHeader>

                    <Divider />

                    <MobileNavigationList>
                        {visibleNavigationItems.map((item) => {
                            const Icon = item.icon;

                            if (currentPath === item.path) {
                                return null;
                            }

                            return (
                                <MobileNavigationItem key={item.path}>
                                    <MobileNavigationButton
                                        component={NavLink}
                                        to={item.path}
                                        onClick={handleClose}
                                    >
                                        <MobileNavigationIcon>
                                            <Icon
                                                sx={{
                                                    width: pxToRem(35),
                                                    height: pxToRem(35),
                                                }}
                                            />
                                        </MobileNavigationIcon>

                                        <MobileNavigationText
                                            disableTypography
                                            primary={item.label}
                                        />
                                    </MobileNavigationButton>
                                </MobileNavigationItem>
                            );
                        })}

                        {!isAuthenticated && currentPath !== '/login' && (
                            <MobileActionEntry>
                                <MobileActionButton
                                    component={NavLink}
                                    to="/login"
                                    variant="contained"
                                    startIcon={<Login />}
                                    onClick={handleClose}
                                >
                                    Login
                                </MobileActionButton>
                            </MobileActionEntry>
                        )}

                        {isAuthenticated && (
                            <MobileActionEntry>
                                <LogoutMenu
                                    fun={handleClose}
                                    sx={() => ({
                                        marginLeft: variables.spacing.sm,
                                        width: '50vw',
                                        minHeight: variables.spacing.xl,
                                        borderRadius: variables.radius.pill,
                                        fontSize: variables.fontSize.md,
                                    })}
                                />
                            </MobileActionEntry>
                        )}
                    </MobileNavigationList>
                </MobileDrawerContent>
            </Drawer>
        </>
    );
};

export default MobileMenu;
