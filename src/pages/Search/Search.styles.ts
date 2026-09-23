import { Box, ListItem, styled } from '@mui/material';

export const SearchWrap = styled(Box)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.variables.radius.pill,
        paddingLeft: theme.variables.spacing.md,
    },
    '& .MuiPaper-root': {
        borderRadius: '45px',
        padding: theme.variables.spacing.md,
        backgroundColor: theme.colors.primary[50],
        marginTop: theme.variables.spacing.md,
    },
    '& .MuiAutocomplete-listbox': {
        padding: theme.variables.spacing.sm,
        scrollbarWidth: 'none',

        '& .MuiListItemText-root': {
            justifyContent: 'right',
        },
    },
    '& .MuiAutocomplete-option': {
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    '& .MuiTypography-root': {
        ...theme.mixins.flexBetween,
        justifyContent: 'flex-end',
    },
}));

export const SearchResult = styled(ListItem)(({ theme }) => ({
    ...theme.mixins.flexBetween,
    gap: theme.variables.spacing.md,
}));
