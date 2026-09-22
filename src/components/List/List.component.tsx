import { useNavigate } from 'react-router';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ArrowOutward, Close } from '@mui/icons-material';

import { useAppSelector } from '@utils';
import { useGithubSocial } from '@pages/Common';
import { colors } from '@theme';

import { FollowButton, StyledAvatar } from '@components/Common';
import { ListItemContent, StyleListItem, Tag } from './List.styles';
import { useState } from 'react';

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
    const { isFetched, following } = useAppSelector((state) => state.social);

    const [hideDisplay, setHideDisplay] = useState<string>('flex');

    const { followUnfollowLoading, followUnfollowError, handleFollowUnfollow } = useGithubSocial();

    const isFollowed = String(id) in following;

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

                            {followUnfollowError && (
                                <Typography color="error">{followUnfollowError}</Typography>
                            )}
                        </Stack>

                        {isFetched && (
                            <Box onClick={(event) => event.stopPropagation()}>
                                <FollowButton
                                    isFollowed={isFollowed}
                                    loading={followUnfollowLoading}
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
