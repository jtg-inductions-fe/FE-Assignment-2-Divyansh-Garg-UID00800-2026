import Bubble from '@components/common/Bubble';
import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { Page } from '@components/common/Page';
import { Card } from '@components/common/Card';
import { Content } from '@components/common/Content';
import { Title } from '@components/common/Header';
import {
    AdditionalInfo,
    Bio,
    Count,
    Eyebrow,
    GridEle,
    GridEleText,
    ProfileAvatar,
    ProfileCard,
    ProfileCardHeader,
    ProfileCardHeaderBottom,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMain,
    ProfileMainTop,
    ProfileUsername,
    StatValue,
} from '@pages/Profile/Profile.styles';

import { FollowButton } from '@components/common/FollowBtn';
import { ErrorBox } from '@components/common/ErrorBox';

import { ArrowOutward } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { useAppDispatch, useAppSelector } from '@app/hooks';
import { snakeToCamelCase } from '@utils/helperFunctions';
import type { AuthUser } from '@features/auth/authTypes';

import type { SocialUser } from '@features/social/socialTypes';
import { addFollower, removeFollower } from '@features/social/socialSlice';

const Profile = () => {
    const { username } = useParams<{ username: string }>();

    const dispatch = useAppDispatch();

    const [searchUserInfo, setSearchUserInfo] = useState<AuthUser | null>(null);

    const [_, setLoading] = useState(false);
    const [error, setError] = useState('');

    const authUser = useAppSelector((state) => state.auth.user);
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    const token = useAppSelector((state) => state.auth.token);
    const isFetched = useAppSelector((state) => state.social.isFetched);
    const following = useAppSelector((state) => state.social.following);

    let isFollowed = false;

    const isOwnProfile =
        isAuthenticated &&
        !!authUser &&
        !!username &&
        authUser.login.toLowerCase() === username.toLowerCase();

    useEffect(() => {
        const handleUserSearch = async (value: string) => {
            const trimmedUsername = value.trim();

            if (!trimmedUsername) {
                setSearchUserInfo(null);
                return;
            }

            setLoading(true);
            setError('');

            try {
                const response = await fetch(`https://api.github.com/users/${trimmedUsername}`, {
                    headers: {
                        Accept: 'application/vnd.github+json',
                    },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('User Not Found');
                    }

                    throw new Error('Unable to get the GitHub user profile.');
                }

                const data = await response.json();

                const formattedData = snakeToCamelCase<typeof data, AuthUser>(data);

                setSearchUserInfo(formattedData);
            } catch (err) {
                setSearchUserInfo(null);

                setError(
                    err instanceof Error
                        ? err.message
                        : 'Something went wrong while connecting to GitHub.',
                );
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            handleUserSearch(username);
        }
    }, [username]);

    const handleFollowUnfollow = async (isFollowed: boolean, user: SocialUser | null) => {
        if (!user) {
            setError('The Following User is not available');
            return;
        }

        const trimmedToken = token?.trim();

        if (!trimmedToken) {
            setError('Please Login First to follow.');
            return;
        }

        setError('');
        setLoading(true);

        if (isFollowed) {
            try {
                const response = await fetch(
                    `https://api.github.com/user/following/${user.login}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${trimmedToken}`,
                            Accept: 'application/vnd.github+json',
                            'Content-Length': '0',
                        },
                    },
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('You are not Authorized to follow the user');
                    }

                    throw new Error('Unable to Follow the user.');
                }

                dispatch(removeFollower(user));
                isFollowed = false;
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong while connecting to GitHub.',
                );
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await fetch(
                    `https://api.github.com/user/following/${user.login}`,
                    {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${trimmedToken}`,
                            Accept: 'application/vnd.github+json',
                            'Content-Length': '0',
                        },
                    },
                );

                if (!response.ok) {
                    if (response.status === 401) {
                        throw new Error('You are not Authorized to Unfollow the user');
                    }

                    throw new Error('Unable to Unfollow the user.');
                }

                dispatch(addFollower(user));
                isFollowed = true;
            } catch (error) {
                setError(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong while connecting to GitHub.',
                );
            } finally {
                setLoading(false);
            }
        }
    };

    isFollowed = Boolean(searchUserInfo && String(searchUserInfo.id) in following);

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
                    <Title variant="h3">{isOwnProfile ? 'My Profile' : 'Profile'}</Title>

                    {error ? (
                        <ErrorBox color="error">{error}</ErrorBox>
                    ) : (
                        <ProfileCard>
                            <ProfileCardHeader>
                                <ProfileCardHeaderTop>
                                    {searchUserInfo?.avatarUrl ? (
                                        <ProfileAvatar
                                            src={searchUserInfo.avatarUrl}
                                            alt={searchUserInfo.login}
                                        />
                                    ) : (
                                        <ProfileAvatar />
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
                                        <ProfileUsername variant="body1">
                                            {searchUserInfo?.name ? searchUserInfo.name : 'NA'}
                                        </ProfileUsername>
                                    </ProfileCardTopHeaderInner>
                                </ProfileCardHeaderTop>

                                <ProfileCardHeaderBottom>
                                    <Count>
                                        <StatValue>
                                            Followers: {searchUserInfo?.followers ?? 'NA'}
                                        </StatValue>
                                    </Count>

                                    <Count>
                                        <StatValue>
                                            Following: {searchUserInfo?.following ?? 'NA'}
                                        </StatValue>
                                    </Count>
                                </ProfileCardHeaderBottom>
                            </ProfileCardHeader>

                            <ProfileMain>
                                <ProfileMainTop>
                                    <Eyebrow variant="h6">
                                        {searchUserInfo?.email ?? 'Email is not available.'}
                                    </Eyebrow>

                                    <Bio variant="h6">
                                        {searchUserInfo?.bio ?? 'Bio is not available.'}
                                    </Bio>
                                </ProfileMainTop>

                                {isAuthenticated && !isOwnProfile && isFetched && (
                                    <FollowButton
                                        isFollowed={isFollowed}
                                        onClick={() =>
                                            handleFollowUnfollow(isFollowed, searchUserInfo)
                                        }
                                    />
                                )}
                            </ProfileMain>

                            {isOwnProfile && searchUserInfo && (
                                <Box>
                                    <AdditionalInfo>
                                        <GridEle>
                                            <Eyebrow variant="h6">Name:</Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.name ?? 'Not available'}
                                            </GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Company:</Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.company ?? 'Not available'}
                                            </GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Location:</Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.location ?? 'Not available'}
                                            </GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Blog:</Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.blog || 'Not available'}
                                            </GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">GitHub ID:</Eyebrow>
                                            <GridEleText>{searchUserInfo.id}</GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Account Type:</Eyebrow>
                                            <GridEleText>{searchUserInfo.type}</GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Public Repositories:</Eyebrow>
                                            <GridEleText>{searchUserInfo.publicRepos}</GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Public Gists:</Eyebrow>
                                            <GridEleText>{searchUserInfo.publicGists}</GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Account Created: </Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.createdAt
                                                    ? searchUserInfo.createdAt
                                                    : 'Not available'}
                                            </GridEleText>
                                        </GridEle>

                                        <GridEle>
                                            <Eyebrow variant="h6">Last Updated: </Eyebrow>
                                            <GridEleText>
                                                {searchUserInfo.updatedAt
                                                    ? searchUserInfo.updatedAt
                                                    : 'Not available'}
                                            </GridEleText>
                                        </GridEle>
                                    </AdditionalInfo>
                                </Box>
                            )}
                        </ProfileCard>
                    )}
                </Card>
            </Content>
        </Page>
    );
};

export default Profile;
