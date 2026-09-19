import Bubble from '@components/common/Bubble';
import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

import { Page } from '@components/common/Page';
import { Card, CardMain, Label, Value } from '@components/common/Card';
import { Content } from '@components/common/Content';
import {
    ProfileCard,
    ProfileCardHeaderTop,
    ProfileCardTopHeaderInner,
    ProfileMainTop,
    ProfileUsername,
    StatValue,
} from '@pages/Profile/Profile.styles';

import { FollowButton } from '@components/common/FollowBtn';
import { ErrorBox } from '@components/common/ErrorBox';
import { CardHeader } from '@components/common/Card';

import { ArrowOutward } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import { StyledAvatar } from '@components/common/StyledAvatar';
import { Grid, GridEle } from '@components/common/Grid';
import { Count, CountBox } from '@components/common/Count';
import { useGithubProfile } from '@components/profile/useGithubProfile';
import { useGithubSocial } from '@components/follow/useGithubSocial';

const Profile = () => {
    const { isFollowed, searchUserInfo, isOwnProfile, error, isAuthenticated } = useGithubProfile();

    const { isFetched, handleFollowUnfollow } = useGithubSocial();

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
                                            {searchUserInfo?.name ? searchUserInfo.name : 'NA'}
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

                                {isAuthenticated && !isOwnProfile && isFetched && (
                                    <FollowButton
                                        isFollowed={isFollowed}
                                        onClick={() =>
                                            handleFollowUnfollow(isFollowed, searchUserInfo)
                                        }
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
                                        <Label variant="h6">Account Created: </Label>
                                        <Value>
                                            {searchUserInfo.createdAt
                                                ? new Date(searchUserInfo.createdAt).toDateString()
                                                : 'Not available'}
                                        </Value>
                                    </GridEle>

                                    <GridEle>
                                        <Label variant="h6">Last Updated: </Label>
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
