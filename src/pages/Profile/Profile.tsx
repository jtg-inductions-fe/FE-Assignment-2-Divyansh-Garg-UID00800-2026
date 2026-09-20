import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowOutward } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import Bubble from '@components/common/Bubble';
import { Card, CardHeader, CardMain, Label, Value } from '@components/common/Card';
import { Content } from '@components/common/Content';
import { ErrorBox } from '@components/common/ErrorBox';
import { FollowButton } from '@components/common/FollowBtn';
import { Grid, GridEle } from '@components/common/Grid';
import { Count, CountBox } from '@components/common/Count';
import { Page } from '@components/common/Page';
import { StyledAvatar } from '@components/common/StyledAvatar';

import {
    ProfileCard,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMainTop,
    ProfileUsername,
} from '@pages/Profile/Profile.styles';

import { addFollower, removeFollower } from '@redux/social/socialSlice';
import { useAppDispatch, useAppSelector } from '@utils/hooks/storeHooks';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { useGithubProfile } from '@utils/hooks/useGithubProfile';
import { useGithubSocial } from '@utils/hooks/useGithubSocial';

const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const dispatch = useAppDispatch();

    const authUser = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const following = useAppSelector((state) => state.social.following);
    const isFetched = useAppSelector((state) => state.social.isFetched);

    const { loading, error, response, handleProfileSearch } = useGithubProfile();

    const { loading: followLoading, error: followError, handleFollowUnfollow } = useGithubSocial();

    const isOwnProfile =
        isAuthenticated &&
        !!authUser &&
        !!username &&
        authUser.login.toLowerCase() === username.toLowerCase();

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

        const result = await handleFollowUnfollow(searchUserInfo.login, isFollowed, token);

        if (result === null) {
            return;
        }

        if (result) {
            dispatch(addFollower(searchUserInfo));
        } else {
            dispatch(removeFollower(searchUserInfo));
        }
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
                                                {searchUserInfo?.login}
                                            </ProfileUsername>

                                            {searchUserInfo?.htmlUrl && (
                                                <IconButton
                                                    href={searchUserInfo.htmlUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Open GitHub profile"
                                                >
                                                    <ArrowOutward htmlColor={colors.primary[500]} />
                                                </IconButton>
                                            )}
                                        </Box>

                                        <ProfileUsername variant="h6">
                                            {searchUserInfo?.name ?? 'NA'}
                                        </ProfileUsername>
                                    </ProfileCardTopHeaderInner>
                                </ProfileCardHeaderTop>

                                <CountBox>
                                    <Count>
                                        <Typography>
                                            Followers: {searchUserInfo?.followers ?? 'NA'}
                                        </Typography>
                                    </Count>

                                    <Count>
                                        <Typography>
                                            Following: {searchUserInfo?.following ?? 'NA'}
                                        </Typography>
                                    </Count>
                                </CountBox>
                            </CardHeader>

                            <CardMain>
                                <ProfileMainTop>
                                    <Label variant="h6">
                                        {searchUserInfo?.email ?? 'Email is not available.'}
                                    </Label>

                                    <Typography variant="h6">
                                        {searchUserInfo?.bio ?? 'Bio is not available.'}
                                    </Typography>
                                </ProfileMainTop>

                                {followError && <ErrorBox color="error">{followError}</ErrorBox>}

                                {isAuthenticated &&
                                    !isOwnProfile &&
                                    isFetched &&
                                    searchUserInfo && (
                                        <FollowButton
                                            isFollowed={isFollowed}
                                            loading={followLoading}
                                            onClick={handleFollow}
                                        />
                                    )}
                            </CardMain>

                            {isOwnProfile && searchUserInfo && (
                                <Grid>
                                    <GridEle>
                                        <Label variant="h6">Name:</Label>
                                        <Value>{searchUserInfo.name ?? 'Not available'}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Company:</Label>
                                        <Value>{searchUserInfo.company ?? 'Not available'}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Location:</Label>
                                        <Value>{searchUserInfo.location ?? 'Not available'}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Blog:</Label>
                                        <Value>{searchUserInfo.blog || 'Not available'}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">GitHub ID:</Label>
                                        <Value>{searchUserInfo.id}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Account Type:</Label>
                                        <Value>{searchUserInfo.type}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Public Repositories:</Label>
                                        <Value>{searchUserInfo.publicRepos}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Public Gists:</Label>
                                        <Value>{searchUserInfo.publicGists}</Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Account Created:</Label>
                                        <Value>
                                            {searchUserInfo.createdAt
                                                ? new Date(searchUserInfo.createdAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Last Updated:</Label>
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

export default Profile;
