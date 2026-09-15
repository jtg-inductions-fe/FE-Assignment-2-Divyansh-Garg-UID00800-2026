import { Login } from '@mui/icons-material';
import { alpha, Button } from '@mui/material';
import { NavLink } from 'react-router';

export const LoginMenu = () => {
    return (
        <Button
            component={NavLink}
            to="/login"
            startIcon={<Login />}
            sx={(theme) => ({
                ml: theme.variables.spacing.sm,
                borderRadius: theme.variables.radius.pill,
                paddingLeft: theme.variables.spacing.md,
                paddingRight: theme.variables.spacing.md,
                fontSize: theme.variables.fontSize.sm,

                '&.active': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                    fontWeight: theme.variables.fontWeight.semiBold,
                },
            })}
        >
            Login
        </Button>
    );
};
