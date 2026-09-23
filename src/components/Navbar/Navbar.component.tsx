import { useState, type MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { GitHub } from '@mui/icons-material';

import { Modal } from '@components/Modal';
import { MobileMenu } from '@components/MobileMenu';

import { useNavigation } from './useNavigation';
import {
    Brand,
    HomeLinkWrapper,
    NavigationBar,
    NavLinks,
    StyledAppBar,
    StyledLogoutButton,
    StyledNavButton,
} from './Navbar.styles';

import { useAppDispatch } from '@utils';

import { logoutUser } from '@redux/auth';
import { removeSocialState } from '@redux/social';
import { closeSidebar } from '@redux/sidebar';
import { useMediaQuery, useTheme } from '@mui/material';

export const Navbar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

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
        <StyledAppBar position="sticky" elevation={0}>
            <NavigationBar>
                {isSmallScreen ? (
                    <>
                        <MobileMenu onLogoutClick={handleLogoutClick} />

                        <HomeLinkWrapper component={NavLink} to="/" aria-label="GitSearch home">
                            <GitHub />

                            <Brand variant="h3">GitSearch</Brand>
                        </HomeLinkWrapper>
                    </>
                ) : (
                    <>
                        <HomeLinkWrapper component={NavLink} to="/" aria-label="GitSearch home">
                            <GitHub />

                            <Brand variant="h3">GitSearch</Brand>
                        </HomeLinkWrapper>

                        <NavLinks aria-label="Main navigation">
                            {items.map((item) => (
                                <StyledNavButton
                                    key={item.path}
                                    component={NavLink}
                                    to={item.path}
                                    startIcon={<item.icon />}
                                >
                                    {item.label}
                                </StyledNavButton>
                            ))}

                            {isAuthenticated ? (
                                <StyledLogoutButton
                                    startIcon={<logoutItem.icon />}
                                    onClick={handleLogoutClick}
                                >
                                    {logoutItem.label}
                                </StyledLogoutButton>
                            ) : (
                                <StyledNavButton
                                    component={NavLink}
                                    to={loginItem.path}
                                    startIcon={<loginItem.icon />}
                                >
                                    {loginItem.label}
                                </StyledNavButton>
                            )}
                        </NavLinks>
                    </>
                )}
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
        </StyledAppBar>
    );
};
