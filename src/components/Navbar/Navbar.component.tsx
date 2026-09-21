import { useState, type MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { GitHub } from '@mui/icons-material';

import { Modal } from '@components/Modal';
import { MobileMenu } from '@components/Menu';

import { NavButton } from './NavButton';
import { useNavigation } from './useNavigation';
import { Brand, HomeLinkWrapper, NavigationBar, NavLinks } from './Navbar.styles';
import { AppBarHeader } from './NavHeader';

import { useAppDispatch } from '@utils';

import { logoutUser } from '@redux/auth';
import { removeSocialState } from '@redux/social';
import { closeSidebar } from '@redux/sidebar';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { items, loginItem, logoutItem, isAuthenticated } = useNavigation();

    const [logoutAnchor, setLogoutAnchor] = useState<HTMLElement | null>(null);

    const handleLogoutClick = (event: MouseEvent<HTMLElement>): void => {
        setLogoutAnchor(event.currentTarget);
    };

    const handleLogout = (): void => {
        dispatch(logoutUser());
        dispatch(removeSocialState());
        dispatch(closeSidebar());
        setLogoutAnchor(null);
        navigate('/login');
    };

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
