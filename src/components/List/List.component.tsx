import { useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowOutward, Close } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import { useAppSelector } from '@utils';
import { useGithubSocial } from '@pages/Common';
import { colors } from '@theme';

import { FollowButton, StyledAvatar } from '@components/Common';
import { ListItemContent, StyleListItem, Tag } from './List.styles';

interface StyleList {
    id: number;
    username: string;
    imgPath: string;
    type: string | null;
    gitURL: string;
}

export const StyledListItem = ({ id, username, imgPath, type, gitURL }: StyleList) => {
    const navigate = useNavigate();

    const token = useAppSelector((state) => state.auth.token);

    const { isFetched, following, followUnfollowLoadingId, followUnfollowError } = useAppSelector(
        (state) => state.social,
    );

    const [hideDisplay, setHideDisplay] = useState<string>('flex');

    const { handleFollowUnfollow } = useGithubSocial();

    const isFollowed = String(id) in following;

    const isFollowLoading = followUnfollowLoadingId === id;

    const itemError = followUnfollowError?.id === id ? followUnfollowError.message : null;

    const handleNavigation = (username: string) => {
        navigate(`/profile/${username}`);
    };

    const handleFollow = async () => {
        if (!token) {
            return;
        }

        await handleFollowUnfollow(id, username, isFollowed, token);
    };

    const hideVisibility = () => {
        setHideDisplay('none');
    };

    return (
        <>
            {!isFollowed && (
                <StyleListItem
                    onClick={() => handleNavigation(username)}
                    sx={{
                        display: hideDisplay,
                    }}
                >
                    <Tag onClick={(event) => event.stopPropagation()}>
                        <IconButton onClick={hideVisibility}>
                            <Close />
                        </IconButton>
                        <StyledAvatar
                            alt={username}
                            src={imgPath}
                            sx={{
                                width: '64px',
                                height: '64px',
                            }}
                        />
                    </Tag>

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

                            {itemError && <Typography color="error">{itemError}</Typography>}
                        </Stack>

                        {isFetched && (
                            <Box onClick={(event) => event.stopPropagation()}>
                                <FollowButton
                                    isFollowed={isFollowed}
                                    loading={isFollowLoading}
                                    onClick={handleFollow}
                                />
                            </Box>
                        )}
                    </ListItemContent>
                </StyleListItem>
            )}
        </>
    );
};
