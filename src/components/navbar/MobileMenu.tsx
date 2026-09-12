import { Close, GitHub, Login, Menu } from '@mui/icons-material';
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Button,
} from '@mui/material';
import { NavLink } from 'react-router';

import { useState, type MouseEvent } from 'react';

import { navigationItems } from '@/config/navigation';
import LogoutMenu from './LogoutMenu';

import { pxToRem } from '@/theme/functions';
import { colors } from '@/theme/colors';
import { variables } from '@/theme/variables';

interface MobileMenuProps {
    isAuthenticated: boolean;
    currentPath: string;
}

const MobileMenu = ({ isAuthenticated, currentPath }: MobileMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const visibleNavigationItems = navigationItems.filter(
        (item) => !item.requiresAuth || isAuthenticated,
    );

    return (
        <>
            <Button
                onClick={handleOpen}
                aria-haspopup="dialog"
                aria-expanded={open}
                sx={{
                    p: 0,
                    minWidth: 0,
                }}
            >
                <Menu
                    sx={(theme) => ({
                        fontSize: theme.variables.iconSize.xl,

                        color: theme.palette.primary.dark,
                        p: 0,
                    })}
                />
            </Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        sx: {
                            width: '100vw',
                            backgroundColor: colors.secondary[50],
                        },
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100vw',
                    }}
                    role="presentation"
                >
                    <Box
                        sx={(theme) => ({
                            ...theme.mixins.flexBetween,
                            px: (theme) => theme.variables.spacing.md,
                            py: (theme) => theme.variables.spacing.sm,

                            height: theme.variables.layout.navbarHeight,
                        })}
                    >
                        <GitHub
                            sx={(theme) => ({
                                fontSize: theme.variables.iconSize.xl,

                                color: theme.palette.primary.dark,
                            })}
                        />

                        <IconButton onClick={handleClose} aria-label="Close navigation menu">
                            <Close
                                sx={(theme) => ({
                                    fontSize: theme.variables.iconSize.lg,
                                })}
                            />
                        </IconButton>
                    </Box>

                    <Divider />

                    <List>
                        {visibleNavigationItems.map((item) => {
                            const Icon = item.icon;

                            if (currentPath === item.path) {
                                return null;
                            }

                            return (
                                <ListItem
                                    key={item.path}
                                    sx={(theme) => ({
                                        ...theme.mixins.flexCenterCol,
                                        fontWeight: theme.variables.fontWeight.bold,
                                    })}
                                >
                                    <ListItemButton
                                        component={NavLink}
                                        to={item.path}
                                        onClick={handleClose}
                                    >
                                        <ListItemIcon
                                            sx={(theme) => ({
                                                minWidth: theme.variables.spacing.xl,
                                                color: colors.secondary[900],
                                            })}
                                        >
                                            <Icon />
                                        </ListItemIcon>

                                        <ListItemText
                                            disableTypography
                                            primary={item.label}
                                            sx={(theme) => ({
                                                color: colors.secondary[900],
                                                fontWeight: 'inherit',
                                                fontSize: theme.variables.fontSize.md,
                                            })}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}

                        <Divider
                            sx={{
                                my: (theme) => theme.variables.spacing.sm,
                            }}
                        />

                        {!isAuthenticated && currentPath !== '/login' && (
                            <ListItem
                                disablePadding
                                sx={{
                                    justifyContent: 'center',
                                    mt: pxToRem(20),
                                }}
                            >
                                <Button
                                    component={NavLink}
                                    to="/login"
                                    variant="contained"
                                    startIcon={<Login />}
                                    sx={(theme) => ({
                                        ml: theme.variables.spacing.sm,
                                        borderRadius: theme.variables.radius.pill,
                                        width: '50vw',
                                        minHeight: pxToRem(50),
                                        fontSize: pxToRem(18),
                                    })}
                                >
                                    Login
                                </Button>
                            </ListItem>
                        )}

                        {isAuthenticated && (
                            <ListItem
                                sx={(theme) => ({
                                    px: theme.variables.spacing.sm,
                                    justifyContent: 'center',
                                })}
                            >
                                <LogoutMenu
                                    sx={() => ({
                                        ml: variables.spacing.sm,
                                        borderRadius: variables.radius.pill,
                                        width: '50vw',
                                        minHeight: pxToRem(50),
                                        fontSize: pxToRem(18),
                                    })}
                                />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default MobileMenu;
