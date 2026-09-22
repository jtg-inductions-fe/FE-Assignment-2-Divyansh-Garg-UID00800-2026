import { Avatar, styled } from '@mui/material';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    borderRadius: theme.variables.radius.pill,

    width: '40px',
    height: '40px',
    flexShrink: 0,
}));
