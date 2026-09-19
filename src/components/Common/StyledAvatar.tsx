import { Avatar, styled } from '@mui/material';

const StyledAvatarBase = styled(Avatar)(({ theme }) => ({
    borderRadius: theme.variables.radius.pill,

    width: '40px',
    height: '40px',
    flexShrink: 0,
}));

export const StyledAvatar = ({ ...props }) => {
    return <StyledAvatarBase {...props} />;
};
