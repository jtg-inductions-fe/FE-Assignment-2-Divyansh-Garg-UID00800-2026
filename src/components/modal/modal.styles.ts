import { Button, Stack, styled } from '@mui/material';
import { colors } from '@theme/colors';

export const PopoverContent = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.md,
    padding: theme.variables.spacing.xl,

    backgroundColor: colors.primary[50],
}));

export const PopoverActions = styled(Stack)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.sm,

    flexDirection: 'row',
}));

export const PopoverActionButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,

    width: '50%',
    textTransform: 'none',
}));
