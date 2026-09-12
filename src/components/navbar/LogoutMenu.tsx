import { Logout } from '@mui/icons-material';
import { Button, Divider, Paper, Popover, Stack, Typography, type SxProps } from '@mui/material';

import { useState, type MouseEvent } from 'react';

import { useAppDispatch } from '@/app/hooks';
import { logoutUser } from '@/features/auth/authSlice';

import { colors } from '@/theme/colors';

interface LogoutProps {
    sx?: SxProps;
}

const LogoutMenu = ({ sx }: LogoutProps) => {
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                startIcon={<Logout />}
                onClick={handleOpen}
                aria-haspopup="dialog"
                aria-expanded={open}
                sx={[
                    (theme) => ({
                        color: colors.error[500],
                        backgroundColor: colors.white,
                        borderRadius: theme.variables.radius.xl,

                        '&:hover': {
                            color: colors.white,
                            backgroundColor: colors.error[500],
                        },
                    }),
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                Logout
            </Button>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}

                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}

                slotProps={{
                    paper: {
                        sx: (theme) => ({
                            mt: theme.variables.spacing.md,
                            width: theme.variables.layout.logoutMenuWidth,
                            maxWidth: 'calc(100vw - 2rem)',
                            borderRadius: theme.variables.radius.xl,
                        }),
                    },
                }}
            >
                <Paper>
                    <Stack
                        sx={(theme) => ({
                            p: theme.variables.spacing.lg,
                            gap: theme.variables.spacing.md,
                            backgroundColor: colors.primary[50],
                        })}
                    >
                        <Stack
                            sx={(theme) => ({
                                gap: theme.variables.spacing.xs,
                            })}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    color: colors.secondary[900],
                                }}
                            >
                                Logout
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={(theme) => ({
                                    color: theme.palette.secondary.dark,
                                })}
                            >
                                Are you sure you want to logout?
                            </Typography>
                        </Stack>

                        <Divider />

                        <Stack
                            sx={(theme) => ({
                                gap: theme.variables.spacing.sm,

                                ...theme.mixins.flexCenter,
                                flexDirection: 'row',
                            })}
                        >
                            <Button
                                variant="outlined"
                                color="inherit"
                                onClick={handleClose}
                                sx={(theme) => ({
                                    borderRadius: theme.variables.radius.xl,
                                    width: '50%',
                                })}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleLogout}
                                sx={(theme) => ({
                                    borderRadius: theme.variables.radius.xl,
                                    width: '50%',
                                })}
                            >
                                Logout
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Popover>
        </>
    );
};

export default LogoutMenu;
