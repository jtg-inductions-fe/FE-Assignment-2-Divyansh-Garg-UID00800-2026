import type { AppBarProps } from '@mui/material';
import { StyledAppBar } from './Navbar.styles';

export const AppBarHeader = (props: AppBarProps) => {
    return <StyledAppBar position="sticky" elevation={0} {...props} />;
};
