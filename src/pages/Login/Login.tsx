import { GitHub, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, TextField, Typography } from '@mui/material';

import Bubble from '@components/common/Bubble';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { LoginHeader, LoginMainSection, LoginWrapper } from '@components/auth/Auth.styles';

import { Page } from '@components/common/Page';
import { Content } from '@components/common/Content';
import { CardLogo, CardLink } from '@components/common/Card';

import { ErrorBox } from '@components/common/ErrorBox';
import { SubmitButton } from '@components/common/SubmitButton';
import { useGitHubAuth } from '@components/auth/useGithubAuth';
import { BASE_URL, PAT_GENERATION_URL } from '@utils/urls';

const Login = () => {
    const patUrl: string = `${BASE_URL}/${PAT_GENERATION_URL}`;

    const { token, showToken, loading, error, handleTokenChange, toggleShowToken, handleLogin } =
        useGitHubAuth();

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
                    maxHeight: '700px',
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
                                            onClick={toggleShowToken}
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

                        <CardLink href={patUrl} target="_blank">
                            Don't have PAT, Generate it.
                        </CardLink>

                        <SubmitButton
                            loading={loading}
                            initialLabel="Connecting..."
                            processingLabel="Connect GitHub"
                            onClick={handleLogin}
                            icon={GitHub}
                        />
                    </LoginMainSection>

                    <Typography variant="body1">
                        Your Personal Access Token is stored locally in your browser.
                    </Typography>
                </LoginWrapper>
            </Content>
        </Page>
    );
};

export default Login;
