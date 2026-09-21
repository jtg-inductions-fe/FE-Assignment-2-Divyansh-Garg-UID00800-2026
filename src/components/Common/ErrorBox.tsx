import { colors } from '@theme';
import { Alert, styled } from '@mui/material';

export const ErrorBox = styled(Alert)(({ theme }) => ({
    width: '100%',
    backgroundColor: colors.error[200],
    borderRadius: theme.variables.radius.lg,
    color: colors.black,
}));
