import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

import { ArrowOutward, Article, CorporateFare, Email, Place } from '@mui/icons-material';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

import {
    Bubble,
    Card,
    CardHeader,
    CardMain,
    Label,
    Value,
    Content,
    ErrorBox,
    Grid,
    GridElement,
    CountBox,
    Page,
    StyledAvatar,
    CountContainer,
    CardPill,
    FollowButton,
} from '@components/Common';

import {
    CaptionBox,
    ProfileCard,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMainTop,
    ProfileUsername,
    StyledIcon,
} from './Profile.styles';

import { useAppSelector } from '@utils';
import { useGithubSocial } from '@pages/Common';

import { useGithubProfile } from './useGithubProfile';

export const Profile = () => {
    const theme = useTheme();
    const colors = theme.colors;
    const functions = theme.functions;
    const variables = theme.variables;

    const navigate = useNavigate();

    const { username } = useParams<{ username: string }>();

    const { user, token, isAuthenticated } = useAppSelector((state) => state.auth);
    const { isFetched, following, followUnfollowLoadingId, followUnfollowError } = useAppSelector(
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

    const isFollowLoading = searchUserInfo?.id === followUnfollowLoadingId;

    const profileFollowError =
        searchUserInfo?.id === followUnfollowError?.id ? followUnfollowError?.message : null;

    useEffect(() => {
        if (!username) {
            return;
        }

        void handleProfileSearch(username).catch((error) => {
            if (error instanceof Error && error.message === 'User Not Found') {
                navigate('/404', { replace: true });
            }
        });
    }, [username, handleProfileSearch, navigate]);

    const handleFollow = async () => {
        if (!searchUserInfo || !token) {
            return;
        }

        await handleFollowUnfollow(searchUserInfo.id, searchUserInfo.login, isFollowed);
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
                    <Typography variant="h3">{isOwnProfile ? 'My Profile' : 'Profile'}</Typography>

                    {error ? (
                        <ErrorBox severity="error">{error}</ErrorBox>
                    ) : loading || !response ? (
                        <CircularProgress size={functions.pxToRem(50)} />
                    ) : (
                        <ProfileCard>
                            <CardHeader>
                                <ProfileCardHeaderTop
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            flexDirection: 'column',
                                        },
                                    }}
                                >
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
                                                <StyledIcon
                                                    title="Open User GitHub Profile"
                                                    href={searchUserInfo.htmlUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Open GitHub profile"
                                                >
                                                    <ArrowOutward htmlColor={colors.primary[600]} />
                                                </StyledIcon>
                                            )}
                                        </Box>

                                        <ProfileUsername
                                            variant="body1"
                                            sx={{
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            @{searchUserInfo?.login}
                                        </ProfileUsername>
                                    </ProfileCardTopHeaderInner>
                                </ProfileCardHeaderTop>

                                <CardPill variant="body1">
                                    <Typography>
                                        {searchUserInfo?.type.toUpperCase() ?? 'USER'}
                                    </Typography>
                                    <Typography>#{searchUserInfo?.id ?? ''}</Typography>
                                </CardPill>
                            </CardHeader>

                            <CountContainer
                                sx={{
                                    [theme.breakpoints.down('sm')]: {
                                        padding: '10px',
                                    },
                                }}
                            >
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
                                <ProfileMainTop
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            padding: 0,
                                        },
                                    }}
                                >
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

                                    <CaptionBox>
                                        <ProfileCardHeaderTop>
                                            <Place fontSize="small" />
                                            <Typography>Location</Typography>
                                        </ProfileCardHeaderTop>
                                        <Label variant="h6">
                                            {searchUserInfo?.location ??
                                                'Location is not available.'}
                                        </Label>
                                    </CaptionBox>
                                </ProfileMainTop>

                                {profileFollowError && (
                                    <ErrorBox severity="error">{profileFollowError}</ErrorBox>
                                )}

                                {isAuthenticated &&
                                    !isOwnProfile &&
                                    isFetched &&
                                    searchUserInfo && (
                                        <FollowButton
                                            title={
                                                isFollowed
                                                    ? `UnFollow ${searchUserInfo.login}`
                                                    : `Follow ${searchUserInfo.login}`
                                            }
                                            disabled={isFollowLoading}
                                            onClick={handleFollow}
                                            sx={
                                                isFollowed
                                                    ? {
                                                          color: colors.white,
                                                          backgroundColor: colors.secondary[900],
                                                          fontSize: variables.fontSize.sm,
                                                          '&:hover': {
                                                              backgroundColor:
                                                                  colors.secondary[500],
                                                          },
                                                      }
                                                    : {}
                                            }
                                        >
                                            {isFollowLoading ? (
                                                <CircularProgress size={31} />
                                            ) : isFollowed ? (
                                                'Unfollow'
                                            ) : (
                                                'Follow'
                                            )}
                                        </FollowButton>
                                    )}
                            </CardMain>

                            {isOwnProfile && searchUserInfo && (
                                <Grid>
                                    <GridElement>
                                        <Label>Account Created:</Label>
                                        <Value>
                                            {searchUserInfo.createdAt
                                                ? new Date(searchUserInfo.createdAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridElement>

                                    <GridElement>
                                        <Label>Last Updated:</Label>
                                        <Value>
                                            {searchUserInfo.updatedAt
                                                ? new Date(searchUserInfo.updatedAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridElement>
                                </Grid>
                            )}
                        </ProfileCard>
                    )}
                </Card>
            </Content>
        </Page>
    );
};
