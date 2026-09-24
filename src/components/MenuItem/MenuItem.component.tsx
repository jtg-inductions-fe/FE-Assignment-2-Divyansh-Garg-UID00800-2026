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

interface DismissProps {
    onDismiss: () => void;
}

interface FollowButtonProps extends ButtonProps {
    isFollowed: boolean;
    isFetched: boolean;
}

interface UserProps {
    username: string;
    type?: string | null;
    gitURL?: string;
}

interface MenuItemProps {
    userProps: UserProps;
    errorMessage?: string | null;
    onClick: (username: string) => void;
    avatarProps?: AvatarProps;
    followButtonProps?: FollowButtonProps;
    dismissProps?: DismissProps;
    sx?: SxProps;
}

export const MenuItem = ({
    userProps,
    errorMessage,
    onClick,
    avatarProps,
    followButtonProps,
    dismissProps,
    sx,
}: MenuItemProps) => {
    const theme = useTheme();
    const colors = theme.colors;
    const variables = theme.variables;

    return (
        <StyledMenuItem onClick={() => onClick(userProps.username)} sx={sx}>
            <Tag onClick={(event) => event.stopPropagation()}>
                {dismissProps && (
                    <IconButton title="Remove Suggestion" onClick={dismissProps.onDismiss}>
                        <Close />
                    </IconButton>
                )}

                {avatarProps && (
                    <StyledAvatar
                        {...avatarProps}
                        sx={{
                            width: '64px',
                            height: '64px',
                        }}
                    />
                )}
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
                            {userProps.username}
                            {userProps.gitURL && (
                                <IconButton
                                    title="Open Users GitHub Profile"
                                    href={userProps.gitURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <ArrowOutward htmlColor={colors.primary[800]} />
                                </IconButton>
                            )}
                        </Typography>
                    </Box>

                    {userProps.type && <Typography>{userProps.type}</Typography>}

                    {errorMessage && <Typography color="error">{errorMessage}</Typography>}
                </Stack>

                {followButtonProps?.isFetched && (
                    <Box onClick={(event) => event.stopPropagation()}>
                        <FollowButton
                            title={
                                followButtonProps.isFollowed
                                    ? `Unfollow ${userProps.username}`
                                    : `Follow ${userProps.username}`
                            }
                            disabled={followButtonProps.disabled}
                            onClick={followButtonProps.onClick}
                            sx={
                                followButtonProps.isFollowed
                                    ? {
                                          color: colors.white,
                                          backgroundColor: colors.secondary[900],
                                          fontSize: variables.fontSize.sm,
                                          '&:hover': {
                                              backgroundColor: colors.secondary[500],
                                          },
                                      }
                                    : {}
                            }
                        >
                            {followButtonProps.loading ? (
                                <CircularProgress size={31} />
                            ) : followButtonProps.isFollowed ? (
                                'Unfollow'
                            ) : (
                                'Follow'
                            )}
                        </FollowButton>
                    </Box>
                )}
            </MenuItemContent>
        </StyledMenuItem>
    );
};
