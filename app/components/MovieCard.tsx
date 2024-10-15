import { Box, Card, CardMedia, Grid2, Typography } from '@mui/material';
import { Movie } from '../types';
import Link from 'next/link';

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Grid2
      size={{
        xs: 12,
        sm: 6,
        md: 4,
      }}
      key={movie.imdbID}>
      <Link href={`/movies/${movie.imdbID}`} passHref>
        <Card
          sx={{
            position: 'relative',
            textDecoration: 'none',
            cursor: 'pointer',
            borderRadius: '16px',
            overflow: 'hidden',

            '&:hover .detailsOverlay': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          }}>
          <CardMedia
            component="img"
            height="300"
            image={movie.Poster}
            alt={movie.Title}
            sx={{
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />

          <Box
            className="detailsOverlay"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transform: 'translateY(100%)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}>
            <Typography
              variant="h6"
              sx={{
                color: '#ffffff',
                textAlign: 'center',
                px: 2,
              }}>
              {movie.Title}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: '#e0e0e0',
                mt: 1,
              }}>
              <strong>Year:</strong> {movie.Year}
            </Typography>

            <Typography
              variant="subtitle2"
              sx={{
                color: '#e0e0e0',
                mt: 1,
              }}>
              <strong>IMDb ID:</strong> {movie.imdbID}
            </Typography>
          </Box>
        </Card>
      </Link>
    </Grid2>
  );
};

export default MovieCard;
