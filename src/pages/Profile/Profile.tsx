import { useEffect } from 'react';
import { useParams } from 'react-router';

import { ArrowOutward, Article, Email } from '@mui/icons-material';
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
    Count,
    CountBox,
    Page,
    StyledAvatar,
} from '@components/Common';

import {
    CaptionBox,
    ProfileCard,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMainTop,
    ProfileUsername,
} from './Profile.styles';

import { useAppSelector } from '@utils';
import { colors, pxToRem } from '@theme';

import { useGithubProfile } from './useGithubProfile';
import { useGithubSocial } from '@utils/useGithubSocial';

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

                                        <ProfileUsername variant="h6">
                                            {searchUserInfo?.login}
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
                                            {searchUserInfo?.blog ?? 'Blog is not available.'}
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
