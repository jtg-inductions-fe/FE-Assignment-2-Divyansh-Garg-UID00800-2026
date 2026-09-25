import { Box, styled } from '@mui/material';

export const SearchWrap = styled(Box)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.variables.radius.pill,
    },
    '& .MuiInputBase-root': {
        padding: 0,
    },
    '& .MuiPaper-root': {
        borderRadius: theme.variables.radius.xl,
        padding: theme.variables.spacing.md,
        backgroundColor: theme.colors.primary[50],
        marginTop: theme.variables.spacing.md,
    },
    '& .MuiAutocomplete-listbox': {
        scrollbarWidth: 'none',

        '& .MuiBox-root': {
            width: 'fit-content',
        },
    },
}));
