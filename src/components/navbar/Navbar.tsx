import { GitHub } from '@mui/icons-material';
import { NavLink } from 'react-router';

import { Modal } from '@components/modal/Modal';
import MobileMenu from '@components/menu/MobileMenu';

import { NavButton } from './NavButton';
import { useLogout, useNavigation } from './useNavigation';
import { Brand, HomeLinkWrapper, NavigationBar, NavLinks } from './navbar.styles';
import { AppBarHeader } from './NavHeader';

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
                        <NavButton
                            key={item.path}
                            to={item.path}
                            icon={item.icon}
                            label={item.label}
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
                </NavLinks>

                <MobileMenu onLogoutClick={handleLogoutClick} />
            </NavigationBar>

            <Modal
                title="Logout"
                description="Are you sure you want to logout?"
                BtnOneLabel="Cancel"
                BtnTwoLabel="Logout"
                anchorEl={logoutAnchor}
                onClose={() => setLogoutAnchor(null)}
                onConfirm={handleLogout}
            />
        </AppBarHeader>
    );
};

export default Navbar;
