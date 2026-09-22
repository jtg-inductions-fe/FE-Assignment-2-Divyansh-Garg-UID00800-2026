import { Avatar, styled } from '@mui/material';

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
    borderRadius: theme.variables.radius.pill,

    width: '40px',
    height: '40px',
    flexShrink: 0,

    [theme.breakpoints.down('sm')]: {
        width: '60px',
        height: '60px',
    },
}));
