import { Movie } from '../types';
import getApiUrl from './getApiUrl';

export const getMovieDetails = async (
  imdbId: string,
): Promise<{
  movie: Movie | null;
  error: string;
}> => {
  const url = getApiUrl({
    i: imdbId,
  });

  const res = await fetch(url);

  const data = (await res.json()) as Movie;

  if (data.Response === 'True') {
    return { movie: data, error: '' };
  } else {
    return { movie: null, error: data.Error };
  }
};
