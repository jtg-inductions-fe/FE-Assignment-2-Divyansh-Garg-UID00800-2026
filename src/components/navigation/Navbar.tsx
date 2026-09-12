import { GitHub } from '@mui/icons-material';

import { NavLink, useLocation } from 'react-router';

import { useAppSelector } from '@app/hooks';

import { navigationItems } from '@components/navigation/navigation';

import { checkCurrentRoute } from './NavigationUtils';
import { NavButton } from './NavButton';
import MobileMenu from '../menu/MobileMenu';
import LogoutMenu from '../actionButtons/LogoutMenu';
import { LoginMenu } from '../actionButtons/LoginMenu';

import {
    Brand,
    Header,
    HomeLinkWrapper,
    NavigationBar,
    NavLinks,
    ToggleButton,
} from './Navbar.styles';

const Navbar = () => {
    const location = useLocation();

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    const visibleNavigationItems = navigationItems.filter(
        (item) => !item.requiresAuth || isAuthenticated,
    );

    return (
        <Header position="sticky" elevation={0}>
            <NavigationBar>
                <HomeLinkWrapper component={NavLink} to="/" aria-label="GitSearch home">
                    <GitHub
                        sx={(theme) => ({
                            fontSize: theme.variables.iconSize.xl,
                            color: theme.palette.primary.dark,
                        })}
                    />

                    <Brand variant="h3" component="span">
                        GitSearch
                    </Brand>
                </HomeLinkWrapper>

                <NavLinks
                    component="nav"
                    aria-label="Main navigation"
                    sx={{
                        display: {
                            xs: 'none',
                            sm: 'flex',
                        },
                    }}
                >
                    {visibleNavigationItems.map((item) => {
                        if (checkCurrentRoute(location.pathname, item.path)) {
                            return null;
                        }

                        return (
                            <NavButton
                                key={item.path}
                                to={item.path}
                                icon={item.icon}
                                label={item.label}
                            />
                        );
                    })}

                    {!isAuthenticated && location.pathname !== '/login' && <LoginMenu />}

                    {isAuthenticated && <LogoutMenu />}
                </NavLinks>

                <ToggleButton
                    aria-label="Open navigation menu"
                    sx={{
                        display: {
                            xs: 'flex',
                            sm: 'none',
                        },
                    }}
                >
                    <MobileMenu isAuthenticated={isAuthenticated} currentPath={location.pathname} />
                </ToggleButton>
            </NavigationBar>
        </Header>
    );
};

export default Navbar;
