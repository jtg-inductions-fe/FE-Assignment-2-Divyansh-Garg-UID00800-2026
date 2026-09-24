import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Close, Search as SearchIcon } from '@mui/icons-material';
import {
    Autocomplete,
    CircularProgress,
    IconButton,
    TextField,
    Typography,
    useTheme,
} from '@mui/material';

import { Page, Content, Card, Bubble, ErrorBox } from '@components/Common';

import { SearchWrap } from './Search.styles';

import { useGitHubSearch } from './useGithubSearch';
import { MenuItem } from '@components/MenuItem';

export const Search = () => {
    const theme = useTheme();
    const colors = theme.colors;
    const functions = theme.functions;

    const navigate = useNavigate();
    const { username } = useParams<string>();

    const { loading, error, response, handleSearch } = useGitHubSearch();

    const [searchUsername, setSearchUsername] = useState(username ?? '');
    const [open, setOpen] = useState(false);

    const options = response?.items ?? [];

    useEffect(() => {
        const trimmedUsername = searchUsername.trim();

        if (!trimmedUsername) {
            return;
        }

        const timer = window.setTimeout(() => {
            void handleSearch(trimmedUsername);
        }, 400);

        return () => {
            window.clearTimeout(timer);
        };
    }, [searchUsername, handleSearch]);

    useEffect(() => {
        const trimmedUsername = searchUsername.trim();

        if (trimmedUsername) {
            navigate(`/search/${trimmedUsername}`, {
                replace: true,
            });
        } else {
            navigate('/search', {
                replace: true,
            });
        }
    }, [searchUsername, navigate]);

    const handleClear = () => {
        setSearchUsername('');
        setOpen(false);
    };

    const handleNavigation = (login: string) => {
        setOpen(false);
        navigate(`/profile/${login}`);
    };

    const handleSubmitSearch = () => {
        const trimmedUsername = searchUsername.trim();

        if (!trimmedUsername) {
            return;
        }

        handleNavigation(trimmedUsername);
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
                    <Typography variant="h3">Search GitHub Account</Typography>

                    <Typography variant="h4">
                        Enter GitHub Username of person you wanna watch.
                    </Typography>

                    {error && <ErrorBox severity="error">{error}</ErrorBox>}

                    <SearchWrap>
                        <Autocomplete
                            popupIcon={null}
                            openOnFocus={false}
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            inputValue={searchUsername}
                            disablePortal
                            slotProps={{
                                popper: {
                                    placement: 'bottom',
                                    modifiers: [
                                        {
                                            name: 'flip',
                                            enabled: false,
                                        },
                                        {
                                            name: 'preventOverflow',
                                            options: {
                                                boundary: 'viewport',
                                            },
                                        },
                                    ],
                                },
                            }}
                            onInputChange={(_event, value, reason) => {
                                if (reason === 'reset') {
                                    return;
                                }

                                setSearchUsername(value);
                                setOpen(Boolean(value.trim()));
                            }}
                            onChange={(_event, value) => {
                                if (!value) {
                                    return;
                                }

                                handleNavigation(value.login);
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.login}
                            options={options}
                            loading={loading}
                            renderOption={(_, option) => (
                                <MenuItem
                                    key={option.id}
                                    userProps={{
                                        username: option.login,
                                    }}
                                    avatarProps={{
                                        src: option.avatar_url,
                                        alt: option.login.trim(),
                                    }}
                                    onClick={() => handleNavigation(option.login)}
                                    sx={{
                                        [theme.breakpoints.down('sm')]: {
                                            flexDirection: 'row',
                                        },
                                    }}
                                />
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search GitHub username..."
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            handleSubmitSearch();
                                        }
                                    }}
                                    slotProps={{
                                        ...params.slotProps,
                                        input: {
                                            ...params.slotProps?.input,
                                            startAdornment: <SearchIcon />,
                                            endAdornment: (
                                                <Fragment>
                                                    {loading && (
                                                        <CircularProgress
                                                            size={functions.pxToRem(20)}
                                                        />
                                                    )}

                                                    {!loading && searchUsername.trim() && (
                                                        <IconButton
                                                            title="Clear Search"
                                                            onClick={handleClear}
                                                            aria-label="Clear search"
                                                            edge="end"
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    )}

                                                    {params.slotProps?.input?.endAdornment}
                                                </Fragment>
                                            ),
                                        },
                                    }}
                                />
                            )}
                        />
                    </SearchWrap>
                </Card>
            </Content>
        </Page>
    );
};
