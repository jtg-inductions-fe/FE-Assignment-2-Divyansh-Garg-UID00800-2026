import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';
import { Button, styled } from '@mui/material';

export const FollowButton = styled(Button)(({ theme }) => ({
    paddingLeft: theme.variables.spacing.lg,
    paddingRight: theme.variables.spacing.lg,
    borderRadius: theme.variables.radius.pill,
    fontWeight: theme.variables.fontWeight.semiBold,
    transition: theme.variables.transitions.normal,

    flexShrink: 0,
    minWidth: pxToRem(120),
    minHeight: pxToRem(44),
    color: colors.white,
    backgroundColor: colors.primary[700],

    '&:hover': {
        backgroundColor: colors.primary[800],
    },

    [theme.breakpoints.down('md')]: {
        width: '100%',
    },
}));
