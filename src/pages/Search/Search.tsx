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
    const variables = theme.variables;
    const functions = theme.functions;

    const navigate = useNavigate();
    const { username } = useParams<string>();

    const { loading, error, response, handleSearch } = useGitHubSearch();

    const [searchUsername, setSearchUsername] = useState(username ?? '');
    const [_open, setOpen] = useState(false);

    const options = response?.items ?? [];

    const hasResponse = response !== undefined && response !== null;

    const shouldOpen = Boolean(searchUsername.trim()) && (loading || hasResponse);

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
                        Enter GitHub Username of person you want to watch.
                    </Typography>

                    {error && <ErrorBox severity="error">{error}</ErrorBox>}

                    <SearchWrap>
                        <Autocomplete
                            popupIcon={null}
                            openOnFocus={false}
                            open={shouldOpen}
                            onClose={() => setOpen(false)}
                            inputValue={searchUsername}
                            disablePortal
                            noOptionsText={!loading && hasResponse ? 'No GitHub User Found' : ''}
                            loading={loading}
                            loadingText={<CircularProgress size={functions.pxToRem(50)} />}
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
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.login}
                            options={options}
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
                                        borderRadius: variables.radius.xl,
                                    }}
                                />
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search GitHub Username"
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
                                            startAdornment: (
                                                <SearchIcon
                                                    sx={{
                                                        marginLeft: '7.5px',
                                                        padding: 0,
                                                    }}
                                                />
                                            ),
                                            endAdornment: (
                                                <Fragment>
                                                    {searchUsername.trim() && (
                                                        <IconButton
                                                            title="Clear Search"
                                                            onClick={handleClear}
                                                            aria-label="Clear search"
                                                            edge="end"
                                                        >
                                                            <Close />
                                                        </IconButton>
                                                    )}
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
