import { Close, GitHub, Menu } from '@mui/icons-material';
import { Divider } from '@mui/material';
import { type MouseEvent } from 'react';

import { NavButton, useNavigation } from '@components/Navbar';

import {
    MobileCloseButton,
    MobileDrawer,
    MobileDrawerContent,
    MobileMenuHeader,
    MobileMenuTrigger,
    MobileNavigationList,
} from './Menu.styles';
import { useAppDispatch, useAppSelector } from '@utils';
import { closeSidebar, openSidebar } from '@redux/sidebar';

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

            <MobileDrawer anchor="right" open={isOpen} onClose={handleClose}>
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
                            <NavButton
                                key={item.path}
                                to={item.path}
                                icon={item.icon}
                                label={item.label}
                                onClick={handleClose}
                            />
                        ))}

                        {isAuthenticated ? (
                            <NavButton
                                label={logoutItem.label}
                                icon={logoutItem.icon}
                                isLogout
                                onClick={(event) => {
                                    onLogoutClick(event);
                                    handleClose();
                                }}
                            />
                        ) : (
                            <NavButton
                                label={loginItem.label}
                                icon={loginItem.icon}
                                to={loginItem.path}
                                onClick={handleClose}
                            />
                        )}
                    </MobileNavigationList>
                </MobileDrawerContent>
            </MobileDrawer>
        </>
    );
};
