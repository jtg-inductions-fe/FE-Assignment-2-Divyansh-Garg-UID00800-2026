import { useState, type MouseEvent } from 'react';

import { Close, GitHub, Menu } from '@mui/icons-material';
import { Divider } from '@mui/material';

import { NavButton, useNavigation } from '@components/Navbar';

import {
    MobileCloseButton,
    MobileDrawer,
    MobileDrawerContent,
    MobileMenuHeader,
    MobileMenuTrigger,
    MobileNavigationList,
} from './Menu.styles';

interface MobileMenuProps {
    onLogoutClick: (event: MouseEvent<HTMLElement>) => void;
}

export const MobileMenu = ({ onLogoutClick }: MobileMenuProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };

    const { items, loginItem, logoutItem, isAuthenticated } = useNavigation();

    return (
        <>
            <MobileMenuTrigger
                onClick={handleOpen}
                aria-haspopup="dialog"
                aria-expanded={open}
                aria-label="Open navigation menu"
            >
                <Menu />
            </MobileMenuTrigger>

            <MobileDrawer anchor="right" open={open} onClose={handleClose}>
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
