import { useEffect, useState } from 'react';

import { Refresh } from '@mui/icons-material';
import { CircularProgress, Typography, useTheme } from '@mui/material';

import {
    Bubble,
    Card,
    CardRelativeHeader,
    Content,
    ErrorBox,
    Page,
    StyledList,
} from '@components/Common';
import { RefreshIcon, MenuItem } from '@components/MenuItem';

import { useAppSelector } from '@utils';
import { useGithubSuggestions } from './useGithubSuggestions';
import { useGithubSocial } from '@pages/Common';
import { useNavigate } from 'react-router';

export const Suggestions = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const colors = theme.colors;
    const functions = theme.functions;

    const token = useAppSelector((state) => state.auth.token);
    const isSuggestionsFetched = useAppSelector((state) => state.suggestions.isSuggestionsFetched);

    const [since, setSince] = useState(() => Math.ceil(Math.random() * 100));

    const [dismissedIds, setDismissedIds] = useState(new Set());

    const { fetchSuggestionsLoading, fetchSuggestionsError, suggestions, handleSuggestionsSearch } =
        useGithubSuggestions();

    const { handleFollowUnfollow } = useGithubSocial();

    const {
        isFetched,
        following,
        followUnfollowLoading,
        followUnfollowLoadingId,
        followUnfollowError,
    } = useAppSelector((state) => state.social);

    useEffect(() => {
        if (!token || isSuggestionsFetched) {
            return;
        }

        void handleSuggestionsSearch(since);
    }, [token, handleSuggestionsSearch]);

    const handleRefresh = () => {
        if (fetchSuggestionsLoading || !token) {
            return;
        }

        if (Object.keys(suggestions).length === 0) {
            void handleSuggestionsSearch(since);
            return;
        }

        setDismissedIds(new Set());
        setSince(() => Math.ceil(Math.random() * 100));

        void handleSuggestionsSearch(since);
    };

    const handleNavigation = (username: string) => {
        navigate(`/profile/${username}`);
    };

    return (
        <Page>
            <Bubble
                sx={{
                    backgroundColor: colors.primary[200],
                    top: functions.pxToRem(-120),
                    right: functions.pxToRem(-120),
                }}
            />

            <Bubble
                sx={{
                    backgroundColor: colors.primary[200],
                    bottom: functions.pxToRem(-120),
                    left: functions.pxToRem(-120),
                }}
            />

            <Content>
                <Card>
                    <CardRelativeHeader>
                        <Typography variant="h3">People you may know</Typography>

                        <RefreshIcon
                            disableRipple
                            title="Fetch New Suggestions"
                            disabled={fetchSuggestionsLoading}
                            onClick={handleRefresh}
                        >
                            {fetchSuggestionsLoading ? (
                                <CircularProgress size={functions.pxToRem(24)} />
                            ) : (
                                <Refresh htmlColor={colors.primary[800]} />
                            )}
                        </RefreshIcon>
                    </CardRelativeHeader>

                    {fetchSuggestionsError ? (
                        <ErrorBox severity="error">{fetchSuggestionsError}</ErrorBox>
                    ) : fetchSuggestionsLoading || !suggestions ? (
                        <Typography variant="body1">Getting your Suggestions...</Typography>
                    ) : (
                        <StyledList>
                            {Object.values(suggestions).map((option) => (
                                <MenuItem
                                    key={option.id}
                                    userProps={{
                                        username: option.login.trim(),
                                        type: option.type,
                                        gitURL: option.html_url,
                                    }}
                                    errorMessage={
                                        followUnfollowError?.id === option.id
                                            ? followUnfollowError?.message
                                            : null
                                    }
                                    onClick={handleNavigation}
                                    avatarProps={{
                                        src: option.avatar_url,
                                        alt: option.login,
                                    }}
                                    followButtonProps={{
                                        isFollowed: String(option.id) in following,
                                        isFetched,
                                        loading: followUnfollowLoadingId === option.id,
                                        disabled: followUnfollowLoading,
                                        onClick: () => {
                                            handleFollowUnfollow(
                                                option.id,
                                                option.login.trim(),
                                                String(option.id) in following,
                                            );
                                        },
                                    }}
                                    dismissProps={{
                                        dismissed: dismissedIds.has(option.id),
                                        onDismiss: () => {
                                            setDismissedIds((oldSet) => {
                                                const newSet = new Set(oldSet);
                                                newSet.add(option.id);
                                                return newSet;
                                            });
                                        },
                                    }}
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
