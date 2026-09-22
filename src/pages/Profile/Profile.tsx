import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowOutward, Article, CorporateFare, Email, Place } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import {
    Bubble,
    Card,
    CardHeader,
    CardMain,
    Label,
    Value,
    Content,
    ErrorBox,
    FollowButton,
    Grid,
    GridEle,
    CountBox,
    Page,
    StyledAvatar,
    CountContainer,
    CardPill,
} from '@components/Common';

import {
    CaptionBox,
    ProfileCard,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMainTop,
    ProfileUsername,
} from './Profile.styles';

import { useAppSelector, useGithubSocial } from '@utils';
import { colors, pxToRem } from '@theme';

import { useGithubProfile } from './useGithubProfile';

export const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
    const { isFetched, following, followUnfollowLoading, followUnfollowError } = useAppSelector(
        (state) => state.social,
    );

    const { loading, error, response, handleProfileSearch } = useGithubProfile();
    const { handleFollowUnfollow } = useGithubSocial();

    const isOwnProfile =
        isAuthenticated &&
        !!user &&
        !!username &&
        user.login.toLowerCase() === username.toLowerCase();

    const searchUserInfo = response;

    const isFollowed = Boolean(searchUserInfo && String(searchUserInfo.id) in following);

    useEffect(() => {
        if (!username) {
            return;
        }

        void handleProfileSearch(username);
    }, [username]);

    const handleFollow = async () => {
        if (!searchUserInfo || !token) {
            return;
        }

        await handleFollowUnfollow(searchUserInfo.id, searchUserInfo.login, isFollowed, token);
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
                    <Typography variant="h3">{isOwnProfile ? 'My Profile' : 'Profile'}</Typography>

                    {error ? (
                        <ErrorBox color="error">{error}</ErrorBox>
                    ) : loading ? (
                        <Typography variant="body1">Loading profile...</Typography>
                    ) : (
                        <ProfileCard>
                            <CardHeader>
                                <ProfileCardHeaderTop>
                                    {searchUserInfo?.avatarUrl ? (
                                        <StyledAvatar
                                            sx={{
                                                width: '90px',
                                                height: '90px',
                                            }}
                                            src={searchUserInfo.avatarUrl}
                                            alt={searchUserInfo.login}
                                        />
                                    ) : (
                                        <StyledAvatar />
                                    )}

                                    <ProfileCardTopHeaderInner>
                                        <Box>
                                            <ProfileUsername variant="h6">
                                                {searchUserInfo?.name ?? 'NA'}
                                            </ProfileUsername>

                                            {searchUserInfo?.htmlUrl && (
                                                <IconButton
                                                    href={searchUserInfo.htmlUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Open GitHub profile"
                                                >
                                                    <ArrowOutward htmlColor={colors.primary[600]} />
                                                </IconButton>
                                            )}
                                        </Box>

                                        <ProfileUsername variant="body1">
                                            {searchUserInfo?.login}
                                        </ProfileUsername>
                                    </ProfileCardTopHeaderInner>
                                </ProfileCardHeaderTop>

                                <CardPill variant="body1">
                                    {searchUserInfo?.type.toUpperCase() ?? 'USER'}
                                </CardPill>
                            </CardHeader>

                            <CardMain>
                                <CaptionBox>
                                    <ProfileCardHeaderTop>
                                        <Place fontSize="small" />
                                        <Typography>
                                            {searchUserInfo?.location ??
                                                'Location is not available.'}
                                        </Typography>
                                    </ProfileCardHeaderTop>
                                    <Label
                                        variant="h6"
                                        sx={{
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        #{searchUserInfo?.id}
                                    </Label>
                                </CaptionBox>
                            </CardMain>

                            <CountContainer>
                                <CountBox>
                                    <Typography>Followers</Typography>
                                    <Typography variant="h4">
                                        {searchUserInfo?.followers ?? 'NA'}
                                    </Typography>
                                </CountBox>
                                <CountBox>
                                    <Typography>Following</Typography>
                                    <Typography variant="h4">
                                        {searchUserInfo?.following ?? 'NA'}
                                    </Typography>
                                </CountBox>
                                <CountBox>
                                    <Typography>Repos</Typography>
                                    <Typography variant="h4">
                                        {searchUserInfo?.publicRepos ?? 'NA'}
                                    </Typography>
                                </CountBox>
                            </CountContainer>

                            <CardMain>
                                <ProfileMainTop>
                                    <CaptionBox>
                                        <ProfileCardHeaderTop>
                                            <Email fontSize="small" />
                                            <Typography>Email</Typography>
                                        </ProfileCardHeaderTop>
                                        <Label
                                            variant="h6"
                                            sx={{
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {searchUserInfo?.email ?? 'Email is not available.'}
                                        </Label>
                                    </CaptionBox>

                                    <CaptionBox>
                                        <ProfileCardHeaderTop>
                                            <Article fontSize="small" />
                                            <Typography>Blog</Typography>
                                        </ProfileCardHeaderTop>
                                        <Label
                                            variant="h6"
                                            sx={{
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            {searchUserInfo?.blog
                                                ? searchUserInfo.blog === ''
                                                    ? 'Blog is not available.'
                                                    : searchUserInfo.blog
                                                : 'Blog is not available.'}
                                        </Label>
                                    </CaptionBox>

                                    <CaptionBox>
                                        <ProfileCardHeaderTop>
                                            <CorporateFare fontSize="small" />
                                            <Typography>Company</Typography>
                                        </ProfileCardHeaderTop>
                                        <Label variant="h6">
                                            {searchUserInfo?.company ?? 'Company is not available.'}
                                        </Label>
                                    </CaptionBox>
                                </ProfileMainTop>

                                {followUnfollowError && (
                                    <ErrorBox color="error">{followUnfollowError}</ErrorBox>
                                )}

                                {isAuthenticated &&
                                    !isOwnProfile &&
                                    isFetched &&
                                    searchUserInfo && (
                                        <FollowButton
                                            isFollowed={isFollowed}
                                            loading={followUnfollowLoading}
                                            onClick={handleFollow}
                                        />
                                    )}
                            </CardMain>

                            {isOwnProfile && searchUserInfo && (
                                <Grid>
                                    <GridEle>
                                        <Label>Account Created:</Label>
                                        <Value>
                                            {searchUserInfo.createdAt
                                                ? new Date(searchUserInfo.createdAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label>Last Updated:</Label>
                                        <Value>
                                            {searchUserInfo.updatedAt
                                                ? new Date(searchUserInfo.updatedAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridEle>
                                </Grid>
                            )}
                        </ProfileCard>
                    )}
                </Card>
            </Content>
        </Page>
    );
};
