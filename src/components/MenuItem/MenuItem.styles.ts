import { styled, ListItem, ListItemText, IconButton, Box } from '@mui/material';

export const StyledMenuItem = styled(ListItem)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.md,
    padding: theme.variables.spacing.md,
    borderBottom: `1px solid ${theme.colors.primary[200]}`,
    cursor: 'pointer',

    justifyContent: 'space-between',
    width: '100%',

    '&:hover': {
        backgroundColor: theme.colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const Tag = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: '5px',

    [theme.breakpoints.down('sm')]: {
        ...theme.mixins.flexBetween,
        width: '100%',

        '& .MuiButtonBase-root': {
            order: 2,
        },
    },
}));

export const MenuItemContent = styled(ListItemText)(({ theme }) => ({
    ...theme.mixins.flexBetween,
}));

export const RefreshIcon = styled(IconButton)(({ theme }) => ({
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));
