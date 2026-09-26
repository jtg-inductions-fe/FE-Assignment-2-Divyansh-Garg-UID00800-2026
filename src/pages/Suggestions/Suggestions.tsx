import { useEffect, useState } from 'react';

import { CircularProgress, Typography, useTheme } from '@mui/material';

import { Bubble, Card, CardHeader, Content, ErrorBox, Page, StyledList } from '@components/Common';
import { MenuItem } from '@components/MenuItem';

import { useAppDispatch, useAppSelector } from '@utils';
import { useGithubSuggestions } from './useGithubSuggestions';
import { useGithubSocial } from '@pages/Common';
import { useNavigate } from 'react-router';
import { removeSuggestionsItem } from '@redux/suggestions';
import { StyledButton } from '@components/Navbar';

export const Suggestions = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const theme = useTheme();
    const colors = theme.colors;
    const functions = theme.functions;

    const token = useAppSelector((state) => state.auth.token);
    const { isSuggestionsFetched, removedSuggestions } = useAppSelector(
        (state) => state.suggestions,
    );

    const myFollowing = useAppSelector((state) => state.auth.user?.following);

    const [since, setSince] = useState(() => Math.ceil(Math.random() * 100));
    const [isRefreshRequest, setIsRefreshRequest] = useState(false);

    const { fetchSuggestionsLoading, fetchSuggestionsError, suggestions, handleSuggestionsSearch } =
        useGithubSuggestions();

    const { handleFollowUnfollow } = useGithubSocial();

    const { isFetched, following, followUnfollowLoadingIds, followUnfollowError } = useAppSelector(
        (state) => state.social,
    );

    useEffect(() => {
        if (fetchSuggestionsLoading) return;

        const visibleSuggestionsCount = Object.values(suggestions).filter((option) => {
            const isFollowed = String(option.id) in following;
            const isRemoved = option.id in removedSuggestions;

            return !isFollowed && !isRemoved;
        }).length;

        if (visibleSuggestionsCount <= 3) {
            const removedCount = Object.keys(removedSuggestions).length;
            const totalToFetch =
                myFollowing !== undefined ? myFollowing + removedCount + 10 : 10 + removedCount;

            void handleSuggestionsSearch(totalToFetch, since);
        }
    }, [
        suggestions,
        removedSuggestions,
        following,
        myFollowing,
        since,
        fetchSuggestionsLoading,
        handleSuggestionsSearch,
    ]);

    useEffect(() => {
        if ((!token || isSuggestionsFetched) && !isRefreshRequest) {
            return;
        }

        if (myFollowing !== undefined) {
            handleSuggestionsSearch(myFollowing + 10, since);
        } else {
            handleSuggestionsSearch(10, since);
        }
    }, [
        token,
        handleSuggestionsSearch,
        isSuggestionsFetched,
        since,
        isRefreshRequest,
        myFollowing,
    ]);

    const handleRefresh = () => {
        if (fetchSuggestionsLoading || !token) {
            return;
        }

        if (Object.keys(suggestions).length === 0) {
            if (myFollowing !== undefined) {
                void handleSuggestionsSearch(
                    myFollowing + Object.keys(removedSuggestions).length + 10,
                    since,
                );
            } else {
                void handleSuggestionsSearch(10 + Object.keys(removedSuggestions).length, since);
            }

            return;
        }

        setSince(() => Math.ceil(Math.random() * 100));
        setIsRefreshRequest(true);
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
                    <CardHeader>
                        <Typography variant="h3">People you may know</Typography>

                        <StyledButton
                            title="Fetch New Suggestions"
                            disabled={fetchSuggestionsLoading}
                            onClick={handleRefresh}
                        >
                            Refresh
                        </StyledButton>
                    </CardHeader>

                    {fetchSuggestionsError ? (
                        <ErrorBox severity="error">{fetchSuggestionsError}</ErrorBox>
                    ) : fetchSuggestionsLoading || !suggestions ? (
                        <CircularProgress size={functions.pxToRem(50)} />
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
                                        isRemoved: option.id in removedSuggestions,
                                        isFetched,
                                        loading: option.id in followUnfollowLoadingIds,
                                        disabled: option.id in followUnfollowLoadingIds,
                                        onClick: () => {
                                            handleFollowUnfollow(
                                                option.id,
                                                option.login.trim(),
                                                String(option.id) in following,
                                            );
                                        },
                                    }}
                                    dismissProps={{
                                        onDismiss: () => {
                                            dispatch(removeSuggestionsItem(option.id));
                                        },
                                    }}
                                />
                            ))}
                        </StyledList>
                    )}
                </Card>
            </Content>
        </Page>
    );
};
