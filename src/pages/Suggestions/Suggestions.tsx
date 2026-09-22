import { useEffect, useState } from 'react';

import { Refresh } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/material';

import { Bubble, Card, Content, ErrorBox, Page } from '@components/Common';
import { StyledListItem, RefreshIcon } from '@components/List';

import { colors, pxToRem } from '@theme';

import { useAppSelector } from '@utils';
import { useGithubSuggestions } from './useGithubSuggestions';
import { StyledList } from '@components/List';

export const Suggestions = () => {
    const token = useAppSelector((state) => state.auth.token);

    const [since, setSince] = useState(1);

    const { loading, error, response, handleSuggestionsSearch } = useGithubSuggestions();

    useEffect(() => {
        if (!token) {
            return;
        }

        void handleSuggestionsSearch(token, since);
    }, [token, since]);

    const handleRefresh = () => {
        if (loading || response.length === 0) {
            return;
        }

        setSince(response[response.length - 1].id);
    };

    return (
        <Page>
            <Bubble
                sx={{
                    backgroundColor: colors.primary[200],
                    top: pxToRem(-120),
                    right: pxToRem(-120),
                }}
            />

            <Bubble
                sx={{
                    backgroundColor: colors.primary[200],
                    bottom: pxToRem(-120),
                    left: pxToRem(-120),
                }}
            />

            <Content
                sx={{
                    width: {
                        lg: '80%',
                    },
                }}
            >
                <Card>
                    <Stack
                        sx={{
                            position: 'relative',
                            width: '100%',
                        }}
                    >
                        <Typography variant="h3">People you may know</Typography>

                        <RefreshIcon disableRipple disabled={loading} onClick={handleRefresh}>
                            {loading ? (
                                <CircularProgress size={pxToRem(24)} />
                            ) : (
                                <Refresh htmlColor={colors.primary[800]} />
                            )}
                        </RefreshIcon>
                    </Stack>

                    {error ? (
                        <ErrorBox severity="error">{error}</ErrorBox>
                    ) : loading ? (
                        <Typography variant="body1">Getting your Suggestions...</Typography>
                    ) : (
                        <StyledList>
                            {response.map((option) => (
                                <StyledListItem
                                    key={option.id}
                                    id={option.id}
                                    username={option.login.trim()}
                                    imgPath={option.avatar_url}
                                    type={option.type}
                                    gitURL={option.html_url}
                                />
                            ))}

                            <Typography
                                variant="h6"
                                sx={{
                                    marginTop: '10px',
                                }}
                            >
                                Refresh to see new Suggestions...
                            </Typography>
                        </StyledList>
                    )}
                </Card>
            </Content>
        </Page>
    );
};
