import { GitHub, Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, CircularProgress, IconButton, TextField } from '@mui/material';

import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';

import Bubble from '@components/common/Bubble';

import { useAppDispatch } from '@app/hooks';
import { loginUser } from '@features/auth/authSlice';
import { type AuthUser } from '@features/auth/authTypes';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { checkRegexFunction, snakeToCamelCase } from '@utils/helperFunctions';
import {
    LoginHeader,
    LoginHeading,
    LoginMainSection,
    LoginSubheading,
    LoginWrapper,
} from '@components/auth/Auth.styles';

import { Page } from '@components/common/Page';
import { Content } from '@components/common/Content';
import { CardLogo, CardFooter, CardLink } from '@components/common/Card';

import { fetchFollowers } from '@utils/followUnfollow';
import { addFollowers } from '@features/social/socialSlice';

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

            const data = await response.json();
            const formattedData = snakeToCamelCase<typeof data, AuthUser>(data);

            const githubUser: AuthUser = formattedData;

            dispatch(
                loginUser({
                    user: githubUser,
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
            const socialUsers = await fetchFollowers(token);
            if (socialUsers) {
                dispatch(addFollowers(socialUsers));
            }
            setLoading(false);
        }
    };

    const handleTokenChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);

        if (error) {
            setError('');
        }
    };

    return (
        <Page>
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

            <Content
                sx={{
                    width: {
                        lg: '80%',
                    },
                    justifyContent: 'center',
                }}
            >
                <LoginWrapper>
                    <LoginHeader>
                        <CardLogo>
                            <GitHub
                                sx={(theme) => ({
                                    fontSize: theme.variables.iconSize.xl,
                                })}
                            />
                        </CardLogo>

                        <LoginHeading variant="h3">Connect GitHub</LoginHeading>

                        <LoginSubheading variant="body1">
                            Enter your GitHub Personal Access Token to connect your account and
                            start exploring GitHub users.
                        </LoginSubheading>
                    </LoginHeader>

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

                    <LoginMainSection>
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

                        <CardLink
                            href="https://github.com/settings/personal-access-tokens"
                            target="_blank"
                        >
                            Don't have PAT, Generate it.
                        </CardLink>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            onClick={() => void handleLogin()}
                            startIcon={
                                loading ? <CircularProgress size={pxToRem(16)} /> : <GitHub />
                            }
                            sx={(theme) => ({
                                borderRadius: theme.variables.radius.pill,
                            })}
                        >
                            {loading ? 'Connecting...' : 'Connect GitHub'}
                        </Button>
                    </LoginMainSection>

                    <CardFooter variant="body1">
                        Your Personal Access Token is stored locally in your browser.
                    </CardFooter>
                </LoginWrapper>
            </Content>
        </Page>
    );
};

export default Login;
