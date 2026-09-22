import { colors, pxToRem, variables } from '@theme';
import { Button, CircularProgress, styled, type ButtonProps } from '@mui/material';

interface FollowButtonProps extends ButtonProps {
    isFollowed: boolean;
    loading?: boolean;
    onClick: VoidFunction;
}

const StyledFollowButton = styled(Button)(({ theme }) => ({
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.pill,
    fontWeight: theme.variables.fontWeight.semiBold,
    transition: theme.variables.transitions.normal,

    flexShrink: 0,
    minWidth: pxToRem(120),
    minHeight: pxToRem(44),
})) as typeof Button;

export const FollowButton = ({ isFollowed, loading, onClick }: FollowButtonProps) => {
    return (
        <StyledFollowButton
            disabled={loading}
            onClick={onClick}
            sx={
                isFollowed
                    ? {
                          color: colors.white,
                          backgroundColor: colors.secondary[900],
                          fontSize: variables.fontSize.sm,
                          '&:hover': {
                              backgroundColor: colors.secondary[500],
                          },
                      }
                    : {
                          color: colors.white,
                          backgroundColor: colors.primary[900],
                          fontSize: variables.fontSize.sm,
                          '&:hover': {
                              backgroundColor: colors.primary[500],
                          },
                      }
            }
        >
            {loading ? <CircularProgress size={31} /> : isFollowed ? 'Unfollow' : 'Follow'}
        </StyledFollowButton>
    );
};
