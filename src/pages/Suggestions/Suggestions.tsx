import { useEffect, useState } from 'react';

import { Refresh } from '@mui/icons-material';
import { CircularProgress, Stack, Typography } from '@mui/material';

import Bubble from '@components/common/Bubble';
import { Card } from '@components/common/Card';
import { Content } from '@components/common/Content';
import { ErrorBox } from '@components/common/ErrorBox';
import { Page } from '@components/common/Page';
import { RefreshIcon, SuggestionsList } from '@components/list/List.styles';
import { StyledListItem } from '@components/list/StyledListItem';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { useAppSelector } from '@utils/hooks/storeHooks';
import { useGithubSuggestions } from '@utils/hooks/useGithubSuggestions';

const Suggestions = () => {
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
                        <SuggestionsList>
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
                        </SuggestionsList>
                    )}
                </Card>
            </Content>
        </Page>
    );
};

export default Suggestions;
