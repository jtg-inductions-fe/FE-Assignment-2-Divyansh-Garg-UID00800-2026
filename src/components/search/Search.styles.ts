import { Alert, Box, styled, Typography } from '@mui/material';

import { colors } from '@/theme/colors';
import { pxToRem } from '@/theme/functions';

export const SearchError = styled(Alert)(({ theme }) => ({
    width: '100%',
    backgroundColor: colors.error[200],
    borderRadius: theme.variables.radius.lg,
    color: colors.black,
}));

export const SearchWrap = styled(Box)(({ theme }) => ({
    width: '100%',
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.variables.radius.pill,
        paddingLeft: theme.variables.spacing.md,
    },
    '& .MuiPaper-root': {
        borderRadius: theme.variables.radius.xl,
        padding: theme.variables.spacing.md,
        backgroundColor: colors.primary[50],
        marginTop: theme.variables.spacing.md,
    },
    '& .MuiAutocomplete-listbox': {
        padding: theme.variables.spacing.sm,
        scrollbarWidth: 'none',
    },
    '& .MuiAutocomplete-option': {
        borderRadius: theme.variables.radius.xl,
        padding: theme.variables.spacing.sm,
        backgroundColor: colors.primary[100],
        marginTop: theme.variables.spacing.sm,
    },
    '& .MuiTypography-root': {
        ...theme.mixins.flexBetween,
        justifyContent: 'flex-end',
    },
}));

export const SearchResult = styled(Box)(({ theme }) => ({
    ...theme.mixins.flexCenter,
    width: '100%',
    gap: theme.variables.spacing.md,
})) as typeof Box;

export const SearchResultAvatar = styled(Box)(({ theme }) => ({
    width: pxToRem(40),
    height: pxToRem(40),
    flexShrink: 0,
    borderRadius: theme.variables.radius.pill,
})) as typeof Box;

export const SearchResultContent = styled(Box)({
    flex: 1,
    minWidth: 0,
});

export const SearchResultUsername = styled(Typography)({
    textAlign: 'left',
});
