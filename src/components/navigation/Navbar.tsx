import { GitHub } from '@mui/icons-material';
import { NavLink } from 'react-router';

import { NavButton } from './NavButton';
import { useLogout, useNavigation } from './useNavigation';
import { LogoutConfirmation } from './LogoutConfirmation';
import MobileMenu from '@components/menu/MobileMenu';

import { Brand, HomeLinkWrapper, NavigationBar, NavLinks } from './navbar.styles';

import { AppBarHeader } from '@components/common/Header';

const Navbar = () => {
    const { items, loginItem, logoutItem, isAuthenticated } = useNavigation();

    const { logoutAnchor, setLogoutAnchor, handleLogoutClick, handleLogout } = useLogout();

    return (
        <AppBarHeader>
            <NavigationBar>
                <HomeLinkWrapper component={NavLink} to="/" aria-label="GitSearch home">
                    <GitHub />

                    <Brand variant="h3">GitSearch</Brand>
                </HomeLinkWrapper>

                <NavLinks aria-label="Main navigation">
                    {items.map((item) => (
                        <NavButton to={item.path} icon={item.icon} label={item.label} />
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
                </NavLinks>

                <MobileMenu />
            </NavigationBar>

            <LogoutConfirmation
                anchorEl={logoutAnchor}
                onClose={() => setLogoutAnchor(null)}
                onConfirm={handleLogout}
            />
        </AppBarHeader>
    );
};

export default Navbar;
