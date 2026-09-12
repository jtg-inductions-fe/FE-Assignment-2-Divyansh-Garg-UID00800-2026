import { Login } from '@mui/icons-material';
import { Button } from '@mui/material';
import { NavLink } from 'react-router';

export const LoginMenu = () => {
    return (
        <Button
            component={NavLink}
            to="/login"
            variant="contained"
            startIcon={<Login />}
            sx={(theme) => ({
                ml: theme.variables.spacing.sm,
                borderRadius: theme.variables.radius.xl,
            })}
        >
            Login
        </Button>
    );
};
