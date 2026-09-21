import { useNavigate } from 'react-router';

import { Box, IconButton, Stack, Typography } from '@mui/material';

import { ArrowOutward } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@utils/hooks/storeHooks';
import { useGithubSocial } from '@utils/hooks/useGithubSocial';

import { colors } from '@/theme/colors';

import { addFollower, removeFollower } from '@redux/social/socialSlice';
import type { SocialUser } from '@redux/social/socialTypes';

import { FollowButton } from '@components/common/FollowBtn';
import { StyledAvatar } from '@components/common/StyledAvatar';
import { ListItemContent, SuggestionsListItem } from '@components/list/List.styles';

interface StyleList {
    id: number;
    username: string;
    imgPath: string;
    type: string | null;
    gitURL: string;
}

export const StyledListItem = ({ id, username, imgPath, type, gitURL }: StyleList) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.auth.token);
    const isFetched = useAppSelector((state) => state.social.isFetched);
    const following = useAppSelector((state) => state.social.following);

    const { loading, error, handleFollowUnfollow } = useGithubSocial();

    const isFollowed = String(id) in following;

    const user: SocialUser = {
        id,
        login: username,
    };

    const handleNavigation = (username: string) => {
        navigate(`/profile/${username}`);
    };

    const handleFollow = async () => {
        if (!token) {
            return;
        }

        const result = await handleFollowUnfollow(username, isFollowed, token);

        if (result === null) {
            return;
        }

        if (result) {
            dispatch(addFollower(user));
        } else {
            dispatch(removeFollower(user));
        }
    };

    return (
        <>
            {!isFollowed && (
                <SuggestionsListItem onClick={() => handleNavigation(username)}>
                    <StyledAvatar
                        alt={username}
                        src={imgPath}
                        sx={{
                            width: '64px',
                            height: '64px',
                        }}
                    />

                    <ListItemContent disableTypography>
                        <Stack>
                            <Box>
                                <Typography variant="h6">
                                    {username}
                                    <IconButton
                                        href={gitURL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <ArrowOutward htmlColor={colors.primary[800]} />
                                    </IconButton>
                                </Typography>
                            </Box>

                            <Typography>{type || 'NA'}</Typography>

                            {error && <Typography color="error">{error}</Typography>}
                        </Stack>

                        {isFetched && (
                            <Box onClick={(event) => event.stopPropagation()}>
                                <FollowButton
                                    isFollowed={isFollowed}
                                    loading={loading}
                                    onClick={() => void handleFollow()}
                                />
                            </Box>
                        )}
                    </ListItemContent>
                </SuggestionsListItem>
            )}
        </>
    );
};
