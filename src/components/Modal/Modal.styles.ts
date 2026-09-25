import { Button, Popover, Stack, styled } from '@mui/material';

export const StyledPopover = styled(Popover)(() => ({
    marginTop: '15px',
    '& .MuiPaper-root': {
        borderRadius: '25px',
    },
}));

export const PopoverContent = styled(Stack)(({ theme }) => ({
    gap: theme.variables.spacing.md,
    padding: theme.variables.spacing.xl,

    backgroundColor: theme.colors.primary[50],
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
