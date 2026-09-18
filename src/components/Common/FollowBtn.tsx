import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';
import { Button, styled } from '@mui/material';

interface FollowButtonProps {
    isFollowed: boolean;
    onClick?: VoidFunction;
}

const StyledFollowButton = styled(Button)(({ theme }) => ({
    paddingLeft: theme.variables.spacing.lg,
    paddingRight: theme.variables.spacing.lg,
    borderRadius: theme.variables.radius.pill,
    fontWeight: theme.variables.fontWeight.semiBold,
    transition: theme.variables.transitions.normal,
    flexShrink: 0,
    minWidth: pxToRem(120),
    minHeight: pxToRem(44),
})) as typeof Button;

export const FollowButton = ({ isFollowed, onClick }: FollowButtonProps) => {
    return (
        <StyledFollowButton
            onClick={onClick}
            sx={
                isFollowed
                    ? {
                          color: colors.white,
                          backgroundColor: colors.secondary[900],
                          '&:hover': {
                              backgroundColor: colors.secondary[500],
                          },
                      }
                    : {
                          color: colors.white,
                          backgroundColor: colors.primary[900],
                          '&:hover': {
                              backgroundColor: colors.primary[500],
                          },
                      }
            }
        >
            {isFollowed ? 'Unfollow' : 'Follow'}
        </StyledFollowButton>
    );
};
