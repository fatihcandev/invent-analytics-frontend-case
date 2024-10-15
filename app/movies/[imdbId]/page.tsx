'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Alert,
  AppBar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
  Grid2,
  IconButton,
} from '@mui/material';
import {
  ArrowBack,
  CalendarToday,
  EmojiEvents,
  Language,
  Paid,
  Work,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';

import metacriticLogo from '@/app/assets/metacritic-logo.png';
import imdbLogo from '@/app/assets/imdb-logo.png';
import rtLogo from '@/app/assets/rotten-tomates-logo.png';
import { getMovieDetails } from '@/app/utils';
import { MovieDetailCard, ThemeSwitch } from '@/app/components';
import { RootState } from '@/app/redux/store';
import { useMovieDetailsActions } from '@/app/redux/hooks';

const ratingLogos: Record<string, string> = {
  'Internet Movie Database': imdbLogo.src,
  'Rotten Tomatoes': rtLogo.src,
  Metacritic: metacriticLogo.src,
};

const MovieDetails = ({ params }: { params: { imdbId: string } }) => {
  const { back } = useRouter();
  const { movie, loading, errorMessage } = useSelector(
    (state: RootState) => state.movieDetails,
  );
  const { setMovie, setLoading, setErrorMessage } = useMovieDetailsActions();

  useEffect(() => {
    const handleGetMovieDetails = async () => {
      setLoading(true);
      setErrorMessage('');
      const { movie: fetchedMovie, error } = await getMovieDetails(
        params.imdbId,
      );
      setLoading(false);
      if (fetchedMovie) {
        setMovie(fetchedMovie);
      } else {
        setErrorMessage(error);
      }
    };
    handleGetMovieDetails();
  }, [params.imdbId, setErrorMessage, setLoading, setMovie]);

  return (
    <>
      <AppBar
        position="fixed"
        sx={(theme) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? 'white'
              : theme.palette.background.default,
        })}>
        <Toolbar>
          <Stack
            flex={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <IconButton onClick={() => back()}>
              <ArrowBack />
            </IconButton>
            <ThemeSwitch />
          </Stack>
        </Toolbar>
      </AppBar>

      {loading ? (
        <Stack
          sx={{
            height: 'calc(100vh - 64px)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CircularProgress />
        </Stack>
      ) : movie ? (
        <>
          <Box
            sx={{
              position: 'relative',
              height: '70vh',
              backgroundImage: `url(${movie.Poster})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              color: 'white',
              padding: '2rem',
              textAlign: 'center',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)',
              },
            }}>
            <Box
              sx={{
                zIndex: 1,
                maxWidth: '800px',
              }}>
              <Typography variant="h2" fontWeight={700} gutterBottom>
                {movie.Title}
              </Typography>

              <Stack direction="row" justifyContent="center" spacing={3} mt={2}>
                {movie.Ratings.map((rating, index) => (
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    key={index}
                    spacing={1}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ratingLogos[rating.Source]}
                      alt={rating.Source}
                      style={{
                        width: '24px',
                        height: '24px',
                        objectFit: 'contain',
                      }}
                    />
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {rating.Value}
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  marginTop: 2,
                  lineHeight: 1.8,
                  fontStyle: 'italic',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}>
                {movie.Plot}
              </Typography>

              <Typography variant="body1" mt={2}>
                {movie.Genre} | {movie.Runtime}
              </Typography>
            </Box>
          </Box>

          <Container
            maxWidth="md"
            sx={{
              marginTop: '2rem',
              paddingBottom: '4rem',
            }}>
            <Grid2 container spacing={4}>
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}>
                <MovieDetailCard
                  title="Director"
                  description={movie.Director}
                  icon={<Work sx={{ color: '#ffa726' }} />}
                />
              </Grid2>
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}>
                <MovieDetailCard
                  title="Cast"
                  description={movie.Actors}
                  icon={<Work sx={{ color: '#ff7043' }} />}
                />
              </Grid2>
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}>
                <MovieDetailCard
                  title="Released"
                  description={movie.Released}
                  icon={<CalendarToday sx={{ color: '#66bb6a' }} />}
                />
              </Grid2>

              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}>
                <MovieDetailCard
                  title="Language"
                  description={movie.Language}
                  icon={<Language sx={{ color: '#42a5f5' }} />}
                />
              </Grid2>

              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}>
                <MovieDetailCard
                  title="Awards"
                  description={movie.Awards}
                  icon={<EmojiEvents sx={{ color: '#ab47bc' }} />}
                />
              </Grid2>

              {movie.BoxOffice && (
                <Grid2
                  size={{
                    xs: 12,
                    sm: 6,
                  }}>
                  <MovieDetailCard
                    title="Box Office"
                    description={movie.BoxOffice}
                    icon={<Paid sx={{ color: '#ef5350' }} />}
                  />
                </Grid2>
              )}
            </Grid2>
          </Container>
        </>
      ) : (
        errorMessage && (
          <Alert
            variant="outlined"
            severity="error"
            sx={{
              mx: 'auto',
            }}>
            {errorMessage}
          </Alert>
        )
      )}
    </>
  );
};

export default MovieDetails;
