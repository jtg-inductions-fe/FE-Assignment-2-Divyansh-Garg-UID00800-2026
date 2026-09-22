import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import { GitHub, Info, Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Bubble, CardLink, CardLogo, Content, ErrorBox, Page } from '@components/Common';
import { LoginHeader, LoginMainSection, LoginWrapper, useGitHubAuth } from '@pages/Login';
import { colors, pxToRem } from '@theme';
import { BASE_URL, PAT_GENERATION_URL } from '@utils';

export const Login = () => {
    const navigate = useNavigate();

    const patUrl = `${BASE_URL}/${PAT_GENERATION_URL}`;

    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);

    const { loading, error, handleLogin } = useGitHubAuth();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
    };

    const toggleVisibility = () => {
        setShowToken((previous) => !previous);
    };

    const handleSubmit = async () => {
        const result = await handleLogin(token);

        if (result) {
            navigate('/search');
        }
    };

    return (
        <Page>
            <Bubble
                sx={{
                    backgroundColor: colors.secondary[200],
                    top: pxToRem(-120),
                    right: pxToRem(-120),
                }}
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
                    maxHeight: pxToRem(700),
                }}
            >
                <LoginWrapper>
                    <LoginHeader>
                        <CardLogo>
                            <GitHub />
                        </CardLogo>

                        <Typography variant="h3">Connect GitHub</Typography>

                        <Typography variant="body1">
                            Enter your GitHub Personal Access Token to connect your account and
                            start exploring GitHub users.
                        </Typography>
                    </LoginHeader>

                    {error && <ErrorBox severity="error">{error}</ErrorBox>}

                    <LoginMainSection>
                        <TextField
                            fullWidth
                            label="Personal Access Token"
                            placeholder="GitHub PAT"
                            type={showToken ? 'text' : 'password'}
                            value={token}
                            onChange={handleInputChange}
                            disabled={loading}
                            autoComplete="off"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && !loading) {
                                    void handleSubmit();
                                }
                            }}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            disabled={loading}
                                            onClick={toggleVisibility}
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

                        <Typography
                            variant="body2"
                            sx={{
                                marginBottom: pxToRem(24),
                            }}
                        >
                            {"Don't have PAT? "}
                            <CardLink href={patUrl} target="_blank">
                                Generate it.
                            </CardLink>
                        </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            onClick={handleSubmit}
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

                    <Stack
                        sx={{
                            flexDirection: 'row',
                            gap: pxToRem(5),
                        }}
                    >
                        <Info htmlColor={colors.secondary[900]} />

                        <Typography>
                            Your Personal Access Token is stored locally in your browser.
                        </Typography>
                    </Stack>
                </LoginWrapper>
            </Content>
        </Page>
    );
};
