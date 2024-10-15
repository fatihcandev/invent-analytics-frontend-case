'use client';

import { useEffect, useRef } from 'react';
import {
  TextField,
  Grid2,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Pagination,
  Container,
  AppBar,
  Toolbar,
  CircularProgress,
  Stack,
  Alert,
  InputAdornment,
  IconButton,
  inputBaseClasses,
} from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useSelector } from 'react-redux';
import { CalendarMonth, Close, Search } from '@mui/icons-material';

import { searchMovies } from './utils';
import { RequestParams } from './types';
import { MovieCard } from './components';
import { RootState } from './redux/store';
import ThemeSwitch from './components/ThemeSwitch';
import { useAppActions } from './redux/hooks';
import logo from './assets/logo.png';

const Home = () => {
  const {
    movies,
    searchTerm,
    type,
    year,
    page,
    totalResults,
    loading,
    errorMessage,
  } = useSelector((state: RootState) => state.app);
  const {
    setErrorMessage,
    setMovies,
    setPage,
    setYear,
    setLoading,
    setSearchTerm,
    setType,
  } = useAppActions();
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [debouncedYear] = useDebounce(year, 300);
  const appBarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleSearchMovies = async () => {
      try {
        setLoading(true);

        const params: RequestParams = {
          s: debouncedSearchTerm,
          type: type,
          y: debouncedYear,
          page: page.toString(),
          i: '',
        };

        const {
          movies: fetchedMovies,
          error,
          totalResults: fetchedTotalResults,
        } = await searchMovies(params);

        if (fetchedMovies && fetchedMovies.length > 0) {
          setMovies({
            movies: fetchedMovies,
            totalResults: parseInt(fetchedTotalResults),
          });
          setErrorMessage('');
        } else {
          setMovies({
            movies: [],
            totalResults: 0,
          });
          setErrorMessage(error || 'No movies found');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setErrorMessage('An error occurred while fetching movies');
      } finally {
        setLoading(false);
      }
    };

    handleSearchMovies();
  }, [
    debouncedSearchTerm,
    debouncedYear,
    type,
    page,
    setMovies,
    setLoading,
    setErrorMessage,
  ]);

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="fixed"
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? 'white'
              : theme.palette.background.default,
        })}>
        <Toolbar
          sx={{
            py: 4,
          }}>
          <Stack gap={4} flex={1}>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Stack direction={'row'} gap={0.5}>
                <img
                  src={logo.src}
                  alt="logo"
                  width={24}
                  height={24}
                  style={{
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={(theme) => ({
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                    lineHeight: '29px',
                  })}>
                  Movie Lens
                </Typography>
              </Stack>
              <ThemeSwitch />
            </Stack>
            <Grid2 container>
              <Grid2
                size={{
                  md: 6,
                }}>
                <Grid2 container spacing={2}>
                  <Grid2
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <TextField
                      fullWidth
                      label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      variant="outlined"
                      placeholder="Movie or TV show name"
                      slotProps={{
                        input: {
                          sx: {
                            [`& .${inputBaseClasses.input}::placeholder`]: {
                              fontSize: '14px',
                            },
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search />
                            </InputAdornment>
                          ),
                          endAdornment: searchTerm.length > 0 && (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setSearchTerm('')}>
                                <Close
                                  sx={{
                                    width: 16,
                                    height: 16,
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid2>
                  <Grid2
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Type">
                        <MenuItem value="movie">Movies</MenuItem>
                        <MenuItem value="series">TV Series</MenuItem>
                        <MenuItem value="episode">Episodes</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}>
                    <TextField
                      fullWidth
                      label="Year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      variant="outlined"
                      placeholder="Enter a year"
                      slotProps={{
                        input: {
                          sx: {
                            [`& .${inputBaseClasses.input}::placeholder`]: {
                              fontSize: '14px',
                            },
                          },
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarMonth />
                            </InputAdornment>
                          ),
                          endAdornment: year.length > 0 && (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setSearchTerm('')}>
                                <Close
                                  sx={{
                                    width: 16,
                                    height: 16,
                                  }}
                                />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          pt: appBarRef.current ? `${appBarRef.current.clientHeight}px` : 0,
        }}>
        {loading ? (
          <Grid2 container justifyContent="center" mt={4}>
            <CircularProgress />
          </Grid2>
        ) : (
          <>
            <Grid2 container spacing={4} mt={3}>
              {movies.length
                ? movies.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))
                : errorMessage && (
                    <Alert
                      variant="outlined"
                      severity="error"
                      sx={{
                        mx: 'auto',
                      }}>
                      {errorMessage}
                    </Alert>
                  )}
            </Grid2>
            {totalResults > 0 && (
              <Grid2 container justifyContent="center" my={4}>
                <Pagination
                  count={Math.ceil(totalResults / 10)}
                  page={page}
                  onChange={(_event, value) => setPage(value)}
                />
              </Grid2>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
