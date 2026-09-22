import { colors } from '@theme';
import { styled, List, ListItem, ListItemText, IconButton } from '@mui/material';

export const StyledList = styled(List)(({ theme }) => ({
    borderRadius: theme.variables.radius.xl,
    padding: theme.variables.spacing.md,
    maxHeight: `calc(100vh - ${theme.variables.layout.navbarHeight})`,

    width: '100%',
    backgroundColor: colors.primary[50],
    overflow: 'scroll',
    scrollbarWidth: 'none',
}));

export const StyleListItem = styled(ListItem)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    gap: theme.variables.spacing.md,
    padding: theme.variables.spacing.md,
    borderBottom: `1px solid ${colors.primary[200]}`,
    cursor: 'pointer',

    justifyContent: 'space-between',
    width: '100%',

    '&:hover': {
        backgroundColor: colors.white,
    },

    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

export const ListItemContent = styled(ListItemText)(({ theme }) => ({
    ...theme.mixins.flexBetween,

    width: '100%',
}));

export const RefreshIcon = styled(IconButton)(({ theme }) => ({
    position: 'relative',

    [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
}));
