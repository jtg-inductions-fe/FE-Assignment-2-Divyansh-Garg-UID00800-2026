import { NavLink } from 'react-router';

import { type SxProps } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material/Button';

import { StyledNavLinkButton } from './Navbar.styles';

interface NavButtonProps extends Omit<ButtonProps, 'component' | 'to'> {
    to: string;
    icon: React.ComponentType;
    label: string;
    sx?: SxProps;
}

export const NavButton = ({ to, icon: Icon, label, sx }: NavButtonProps) => {
    return (
        <StyledNavLinkButton
            component={NavLink}
            to={to}
            startIcon={<Icon />}
            color="inherit"
            sx={[...(Array.isArray(sx) ? sx : [sx])]}
        >
            {label}
        </StyledNavLinkButton>
    );
};
