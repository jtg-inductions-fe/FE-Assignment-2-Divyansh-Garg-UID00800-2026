import { Box, ListItem, styled } from '@mui/material';

import { colors } from '@theme';

export const SearchWrap = styled(Box)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.variables.radius.pill,
        paddingLeft: theme.variables.spacing.md,
    },
    '& .MuiPaper-root': {
        borderRadius: '45px',
        padding: theme.variables.spacing.md,
        backgroundColor: colors.primary[50],
        marginTop: theme.variables.spacing.md,
    },
    '& .MuiAutocomplete-listbox': {
        padding: theme.variables.spacing.sm,
        scrollbarWidth: 'none',
    },
    '& .MuiAutocomplete-option': {
        ...theme.mixins.flexBetween,
        borderRadius: theme.variables.radius.pill,
        padding: theme.variables.spacing.sm,
        backgroundColor: colors.primary[100],
        marginTop: theme.variables.spacing.sm,

        width: '100%',
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
