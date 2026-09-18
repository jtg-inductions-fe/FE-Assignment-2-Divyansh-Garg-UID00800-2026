import { Close, GitHub, Menu } from '@mui/icons-material';
import { Divider, Drawer } from '@mui/material';

import { NavButton } from '@components/navigation/NavButton';
import { useLogout, useNavigation } from '@components/navigation/useNavigation';

import { useExpand } from '@app/hooks';

import {
    MobileDrawerContent,
    MobileMenuHeader,
    MobileMenuTrigger,
    MobileNavigationList,
    MobileCloseButton,
} from './menu.styles';
import { LogoutConfirmation } from '@components/navigation/LogoutConfirmation';

const MobileMenu = () => {
    const { open, handleOpen, handleClose } = useExpand();

    const { items, loginItem, logoutItem, isAuthenticated } = useNavigation();

    const { logoutAnchor, setLogoutAnchor, handleLogoutClick, handleLogout } = useLogout();

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

            <Drawer anchor="right" open={open} onClose={handleClose}>
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
                                onClick={handleLogoutClick}
                            />
                        ) : (
                            <NavButton
                                label={loginItem.label}
                                icon={loginItem.icon}
                                to={loginItem.path}
                            />
                        )}
                    </MobileNavigationList>
                </MobileDrawerContent>

                <LogoutConfirmation
                    anchorEl={logoutAnchor}
                    onClose={() => setLogoutAnchor(null)}
                    onConfirm={handleLogout}
                />
            </Drawer>
        </>
    );
};

export default MobileMenu;
