import { Fragment } from 'react';

import { Close, Search as SearchIcon } from '@mui/icons-material';
import { Autocomplete, CircularProgress, IconButton, TextField, Typography } from '@mui/material';

import { colors, pxToRem } from '@theme';

import { Page, Content, Card, StyledAvatar, Bubble, ErrorBox } from '@components/Common';

import { SearchResult, SearchWrap } from './Search.styles';

import { useGitHubSearch } from './useGithubSearch';

export const Search = () => {
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
    }, [searchUsername]);

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
                            renderOption={(props, option) => (
                                <SearchResult
                                    {...props}
                                    key={option.id}
                                    onClick={() => handleNavigation(option.login)}
                                >
                                    <StyledAvatar
                                        src={option.avatar_url}
                                        alt={`${option.login} avatar`}
                                    />

                                    <Typography variant="h4">{option.login}</Typography>
                                </SearchResult>
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
                                                        <CircularProgress size={pxToRem(20)} />
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
