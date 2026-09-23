import type { Dispatch, SetStateAction } from 'react';

import { ArrowOutward, Close } from '@mui/icons-material';
import {
    Box,
    CircularProgress,
    IconButton,
    Stack,
    Typography,
    useTheme,
    type AvatarProps,
    type ButtonProps,
    type SxProps,
} from '@mui/material';

import { StyledAvatar } from '@components/Common';
import { MenuItemContent, StyledMenuItem, Tag } from './MenuItem.styles';
import { FollowButton } from '@components/Common/FollowButton';

interface DisplayProps {
    displayType: string;
    setDisplayType?: Dispatch<SetStateAction<string>>;
}

interface MenuItemProps {
    username: string;
    type?: string | null;
    gitURL?: string;
    isFetched?: boolean;
    itemError?: string | null;
    onClick: (username: string) => void;
    isFollowed?: boolean;
    sx?: SxProps;
    avatarProps: AvatarProps;
    followButtonProps?: ButtonProps;
    displayProps?: DisplayProps;
}

export const MenuItem = ({
    username,
    type,
    gitURL,
    isFetched,
    itemError,
    onClick,
    isFollowed,
    sx,
    displayProps,
    avatarProps,
    followButtonProps,
}: MenuItemProps) => {
    const theme = useTheme();

    return (
        <>
            {!isFollowed && (
                <StyledMenuItem
                    onClick={() => onClick(username)}
                    sx={{
                        display: displayProps?.displayType,
                        ...sx,
                    }}
                >
                    <Tag onClick={(event) => event.stopPropagation()}>
                        {displayProps?.displayType && (
                            <IconButton onClick={() => displayProps.setDisplayType?.('none')}>
                                <Close />
                            </IconButton>
                        )}

                        <StyledAvatar
                            {...avatarProps}
                            sx={{
                                width: '64px',
                                height: '64px',
                            }}
                        />
                    </Tag>

                    <MenuItemContent
                        disableTypography
                        sx={{
                            width: '100%',
                        }}
                    >
                        <Stack>
                            <Box>
                                <Typography variant="h6">
                                    {username}
                                    {!!gitURL && (
                                        <IconButton
                                            href={gitURL}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(event) => event.stopPropagation()}
                                        >
                                            <ArrowOutward htmlColor={theme.colors.primary[800]} />
                                        </IconButton>
                                    )}
                                </Typography>
                            </Box>

                            {type && <Typography>{type}</Typography>}

                            {itemError && <Typography color="error">{itemError}</Typography>}
                        </Stack>

                        {followButtonProps && isFetched && (
                            <Box onClick={(event) => event.stopPropagation()}>
                                <FollowButton {...followButtonProps}>
                                    {followButtonProps.disabled ? (
                                        <CircularProgress size={31} />
                                    ) : isFollowed ? (
                                        'Unfollow'
                                    ) : (
                                        'Follow'
                                    )}
                                </FollowButton>
                            </Box>
                        )}
                    </MenuItemContent>
                </StyledMenuItem>
            )}
        </>
    );
};
