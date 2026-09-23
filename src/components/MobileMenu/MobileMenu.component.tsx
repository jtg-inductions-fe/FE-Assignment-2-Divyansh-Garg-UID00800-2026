import { type MouseEvent } from 'react';
import { Close, GitHub, Menu } from '@mui/icons-material';
import { Divider } from '@mui/material';

import { StyledLogoutButton, StyledNavButton, useNavigation } from '@components/Navbar';

import {
    MobileCloseButton,
    MobileDrawer,
    MobileDrawerContent,
    MobileMenuHeader,
    MobileMenuTrigger,
    MobileNavigationList,
} from './MobileMenu.styles';
import { useAppDispatch, useAppSelector } from '@utils';
import { closeSidebar, openSidebar } from '@redux/sidebar';
import { NavLink } from 'react-router';

interface MobileMenuProps {
    onLogoutClick: (event: MouseEvent<HTMLElement>) => void;
}

export const MobileMenu = ({ onLogoutClick }: MobileMenuProps) => {
    const dispatch = useAppDispatch();

    const isOpen = useAppSelector((state) => state.sidebar.isOpen);

    const handleOpen = (): void => {
        dispatch(openSidebar());
    };

    const handleClose = (): void => {
        dispatch(closeSidebar());
    };

    const { items, loginItem, logoutItem, isAuthenticated } = useNavigation();

    return (
        <>
            <MobileMenuTrigger
                onClick={handleOpen}
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-label="Open navigation menu"
            >
                <Menu />
            </MobileMenuTrigger>

            <MobileDrawer anchor="left" open={isOpen} onClose={handleClose}>
                <MobileDrawerContent>
                    <MobileMenuHeader>
                        <GitHub />

                        <MobileCloseButton onClick={handleClose} aria-label="Close navigation menu">
                            <Close />
                        </MobileCloseButton>
                    </MobileMenuHeader>

                    <Divider />

                    <MobileNavigationList>
                        {items.map((item) => (
                            <StyledNavButton
                                component={NavLink}
                                to={item.path}
                                startIcon={<item.icon />}
                                onClick={handleClose}
                            >
                                {item.label}
                            </StyledNavButton>
                        ))}

                        {isAuthenticated ? (
                            <StyledLogoutButton
                                startIcon={<logoutItem.icon />}
                                onClick={onLogoutClick}
                            >
                                {logoutItem.label}
                            </StyledLogoutButton>
                        ) : (
                            <StyledNavButton
                                component={NavLink}
                                to={loginItem.path}
                                startIcon={<loginItem.icon />}
                                onClick={handleClose}
                            >
                                {loginItem.label}
                            </StyledNavButton>
                        )}
                    </MobileNavigationList>
                </MobileDrawerContent>
            </MobileDrawer>
        </>
    );
};
