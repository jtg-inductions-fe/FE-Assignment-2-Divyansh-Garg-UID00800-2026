import { Fragment } from 'react';

import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import { Autocomplete, CircularProgress, IconButton, TextField, Typography } from '@mui/material';

import { SearchWrap, SearchResult } from '@components/search/Search.styles';
import { useGitHubSearch } from '@components/search/useGitHubSearch';

import Bubble from '@components/common/Bubble';
import { Content } from '@components/common/Content';
import { Page } from '@components/common/Page';
import { Card } from '@components/common/Card';
import { ErrorBox } from '@components/common/ErrorBox';
import { StyledAvatar } from '@components/common/StyledAvatar';

import { colors } from '@theme/colors';
import { pxToRem } from '@theme/functions';

const Search = () => {
    const {
        open,
        error,
        options,
        loading,
        searchUsername,
        setOpen,
        handleClear,
        handleNavigation,
        setSearchUsername,
        handleSubmitSearch,
    } = useGitHubSearch();

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

export default Search;
