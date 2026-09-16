import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import { Autocomplete, CircularProgress, IconButton, TextField } from '@mui/material';

import Bubble from '@/components/common/Bubble';
import {
    SearchWrap,
    SearchResult,
    SearchResultContent,
    SearchResultUsername,
    SearchResultAvatar,
} from '@/components/search/Search.styles';

import { Content } from '@/components/common/Content';
import { Page } from '@/components/common/Page';
import { Card } from '@/components/common/Card';
import { Title, Subtitle } from '@/components/common/Header';
import { ErrorBox } from '@/components/common/ErrorBox';

import type { GithubSearchResponse, GithubUser } from '@/features/Search/Search';

import { colors } from '@/theme/colors';
import { pxToRem } from '@/theme/functions';
import { snakeToCamelCase } from '@/utils/helperFunctions';

const Search = () => {
    const navigate = useNavigate();

    const { username } = useParams<string>();

    const [searchUsername, setSearchUsername] = useState(username ?? '');
    const [options, setOptions] = useState<GithubUser[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (value: string) => {
        const trimmedUsername = value.trim();

        if (!trimmedUsername) {
            setOptions([]);
            setError('');
            setLoading(false);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(
                `https://api.github.com/search/users?q=${trimmedUsername}`,
                {
                    headers: {
                        Accept: 'application/vnd.github+json',
                    },
                },
            );

            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API rate limit exceeded.');
                }

                throw new Error('Unable to search GitHub users.');
            }

            const data = await response.json();

            const formatted = snakeToCamelCase<typeof data, GithubSearchResponse>(data);

            setOptions(formatted.items);
        } catch (error) {
            setOptions([]);

            setError(error instanceof Error ? error.message : 'Unable to search GitHub users.');
        } finally {
            setLoading(false);
        }
    };

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
    }, [searchUsername]);

    useEffect(() => {
        const trimmedUsername = searchUsername.trim();

        if (trimmedUsername) {
            navigate(`/search/${trimmedUsername}`);
        } else {
            navigate('/search');
        }
    }, [searchUsername, navigate]);

    const handleClear = () => {
        setSearchUsername('');
        setOptions([]);
        setError('');
        setOpen(false);
    };

    const handleNavigation = (login: string) => {
        setOpen(false);

        navigate(`/profile/${login}`);
    };

    const handleSubmitSearch = () => {
        const trimmedUsername = searchUsername.trim();

        if (!trimmedUsername) {
            setError('Please enter a GitHub username to search.');

            return;
        }

        handleNavigation(trimmedUsername);
    };

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
                    <Title variant="h3">Search GitHub Account</Title>

                    <Subtitle variant="h5">
                        Enter GitHub Username of person you wanna watch.
                    </Subtitle>

                    {error && <ErrorBox severity="error">{error}</ErrorBox>}

                    <SearchWrap>
                        <Autocomplete
                            popupIcon={null}
                            openOnFocus={false}
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            value={null}
                            inputValue={searchUsername}
                            disablePortal={true}
                            onInputChange={(_event, value, reason) => {
                                if (reason === 'reset') {
                                    return;
                                }

                                setSearchUsername(value);

                                if (value.trim()) {
                                    setOpen(true);
                                } else {
                                    setOpen(false);
                                }
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
                            noOptionsText={
                                searchUsername.trim()
                                    ? 'No GitHub user found.'
                                    : 'Start typing a username.'
                            }
                            renderOption={(props, option) => (
                                <SearchResult
                                    component="li"
                                    {...props}
                                    key={option.id}
                                    onClick={() => handleNavigation(option.login)}
                                >
                                    <SearchResultAvatar
                                        component="img"
                                        src={option.avatar_url}
                                        alt={`${option.login} avatar`}
                                    />

                                    <SearchResultContent>
                                        <SearchResultUsername variant="h6">
                                            {option.login}
                                        </SearchResultUsername>
                                    </SearchResultContent>
                                </SearchResult>
                            )}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder="Search Hub username..."
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
                                                    color="action"
                                                    sx={{
                                                        mr: pxToRem(8),
                                                    }}
                                                />
                                            ),
                                            endAdornment: (
                                                <Fragment>
                                                    {loading && (
                                                        <CircularProgress
                                                            color="inherit"
                                                            size={pxToRem(20)}
                                                        />
                                                    )}

                                                    {!loading && searchUsername.trim() && (
                                                        <IconButton
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

export default Search;
