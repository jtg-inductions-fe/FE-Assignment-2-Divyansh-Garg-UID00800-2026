import { GitHub, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CircularProgress,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router';

import Bubble from '@/components/common/Bubble';

import { useAppDispatch } from '@/app/hooks';
import { loginUser } from '@/features/auth/authSlice';
import { allowedKeys, type AuthUser } from '@/features/auth/authTypes';

import { colors } from '@/theme/colors';
import { pxToRem } from '@/theme/functions';

import { pickKeys, checkRegexFunction } from '@/utils/helperFunctions';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const trimmedToken = token.trim();

        if (!trimmedToken) {
            setError('Please enter your GitHub Personal Access Token.');
            return;
        }

        if (!checkRegexFunction(trimmedToken)) {
            setError('Please enter your correct GitHub Personal Access Token.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `Bearer ${trimmedToken}`,
                    Accept: 'application/vnd.github+json',
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid GitHub Personal Access Token.');
                }

                throw new Error('Unable to authenticate with GitHub.');
            }

            const githubUser: AuthUser = await response.json();
            const user = pickKeys<AuthUser>(githubUser, allowedKeys);

            dispatch(
                loginUser({
                    user: user,
                    token: trimmedToken,
                }),
            );

            navigate('/search');
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong while connecting to GitHub.',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);

        if (error) {
            setError('');
        }
    };

    return (
        <Box
            sx={(theme) => ({
                ...theme.mixins.flexCenter,
                minHeight: `calc(100vh - ${theme.variables.layout.navbarHeight})`,
                px: theme.variables.layout.pagePadding,
                py: theme.variables.spacing.xxl,

                position: 'relative',
                background: colors.primary[50],
                overflowY: 'clip',
                overflowX: {
                    xs: 'clip',
                },
            })}
        >
            <Bubble
                sx={() => ({
                    backgroundColor: colors.secondary[200],
                    top: pxToRem(-120),
                    right: pxToRem(-120),
                })}
            />

            <Bubble
                sx={{
                    backgroundColor: colors.secondary[200],
                    bottom: pxToRem(-120),
                    left: pxToRem(-120),
                }}
            />

            <Card
                elevation={0}
                sx={(theme) => ({
                    ...theme.mixins.flexCenterCol,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: theme.variables.radius.xl,
                    backgroundColor: `${theme.palette.background.paper}F5`,
                    boxShadow: theme.variables.shadows.card,
                    py: theme.variables.spacing.xxl,
                    px: theme.variables.spacing.xxl,
                    gap: theme.variables.spacing.xl,

                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: pxToRem(640),
                    minHeight: `calc(70vh - ${theme.variables.layout.navbarHeight})`,
                })}
            >
                <Stack
                    sx={(theme) => ({
                        gap: theme.variables.spacing.sm,

                        alignItems: 'center',
                        width: '100%',
                    })}
                >
                    <Box
                        sx={(theme) => ({
                            ...theme.mixins.flexCenter,
                            borderRadius: theme.variables.radius.lg,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            width: theme.variables.iconSize.xxl,
                            height: theme.variables.iconSize.xxl,
                        })}
                    >
                        <GitHub
                            sx={(theme) => ({
                                fontSize: theme.variables.iconSize.xl,
                            })}
                        />
                    </Box>

                    <Typography
                        variant="h3"
                        sx={(theme) => ({
                            fontWeight: theme.variables.fontWeight.bold,

                            textAlign: 'center',
                        })}
                    >
                        Connect GitHub
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: 'center',
                            width: '80%',
                            color: colors.primary[900],
                        }}
                    >
                        Enter your GitHub Personal Access Token to connect your account and start
                        exploring GitHub users.
                    </Typography>
                </Stack>

                {error && (
                    <Alert
                        severity="error"
                        sx={(theme) => ({
                            width: '100%',
                            backgroundColor: colors.error[200],
                            borderRadius: theme.variables.radius.lg,
                            color: colors.black,
                        })}
                    >
                        {error}
                    </Alert>
                )}

                <Stack
                    sx={(theme) => ({
                        alignItems: 'center',
                        gap: theme.variables.spacing.sm,
                        width: '100%',
                    })}
                >
                    <TextField
                        fullWidth
                        label="Personal Access Token"
                        placeholder="GitHub PAT"
                        type={showToken ? 'text' : 'password'}
                        value={token}
                        onChange={handleTokenChange}
                        disabled={loading}
                        autoComplete="off"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !loading) {
                                void handleLogin();
                            }
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <IconButton
                                        disabled={loading}
                                        onClick={() => setShowToken((previous) => !previous)}
                                        aria-label={showToken ? 'Hide token' : 'Show token'}
                                    >
                                        {showToken ? (
                                            <VisibilityOff htmlColor={colors.error[500]} />
                                        ) : (
                                            <Visibility htmlColor={colors.primary[500]} />
                                        )}
                                    </IconButton>
                                ),
                            },
                        }}
                    />

                    <Button
                        component="a"
                        href="https://github.com/settings/personal-access-tokens"
                        target="_blank"
                        sx={{
                            color: colors.primary[900],
                            p: 0,
                            width: '100%',
                            justifyContent: 'end',
                        }}
                    >
                        Don't have PAT, Generate it.
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading}
                        onClick={() => void handleLogin()}
                        startIcon={loading ? <CircularProgress size={pxToRem(16)} /> : <GitHub />}
                        sx={(theme) => ({
                            borderRadius: theme.variables.radius.pill,
                        })}
                    >
                        {loading ? 'Connecting...' : 'Connect GitHub'}
                    </Button>
                </Stack>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        color: colors.primary[900],
                    }}
                >
                    Your Personal Access Token is stored locally in your browser.
                </Typography>
            </Card>
        </Box>
    );
};

export default Login;
