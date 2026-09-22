import type { SvgIconComponent } from '@mui/icons-material';
import type { ButtonProps } from '@mui/material';
import { NavLink } from 'react-router';

import { StyledLogoutButton, StyledNavButton } from './Navbar.styles';

interface NavButtonProps extends Omit<ButtonProps, 'children'> {
    label: string;
    icon: SvgIconComponent;
    to?: string;
    isLogout?: boolean;
    fun?: VoidFunction;
}

export const NavButton = ({
    label,
    icon: Icon,
    to,
    isLogout = false,
    fun,
    ...Props
}: NavButtonProps) => {
    const ButtonComponent = isLogout ? StyledLogoutButton : StyledNavButton;

    if (to) {
        return (
            <ButtonComponent component={NavLink} to={to} startIcon={<Icon />} {...Props}>
                {label}
            </ButtonComponent>
        );
    }

    return (
        <ButtonComponent startIcon={<Icon />} {...Props}>
            {label}
        </ButtonComponent>
    );
};
