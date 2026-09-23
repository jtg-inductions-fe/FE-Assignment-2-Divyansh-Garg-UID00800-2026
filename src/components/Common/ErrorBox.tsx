import { Alert, styled } from '@mui/material';

export const ErrorBox = styled(Alert)(({ theme }) => ({
    width: '100%',
    backgroundColor: theme.colors.error[200],
    borderRadius: theme.variables.radius.lg,
    color: theme.colors.black,
}));
