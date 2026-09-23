import { Button, styled } from '@mui/material';

export const FollowButton = styled(Button)(({ theme }) => ({
    padding: theme.variables.spacing.md,
    borderRadius: theme.variables.radius.pill,
    fontWeight: theme.variables.fontWeight.semiBold,
    transition: theme.variables.transitions.normal,

    color: theme.colors.white,
    backgroundColor: theme.colors.primary[900],
    fontSize: theme.variables.fontSize.sm,
    flexShrink: 0,
    minWidth: theme.functions.pxToRem(120),
    minHeight: theme.functions.pxToRem(44),

    '&:hover': {
        backgroundColor: theme.colors.primary[500],
    },
}));
