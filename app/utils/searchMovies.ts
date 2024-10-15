import { Movie, MovieSearchResponse, RequestParams } from '../types';
import getApiUrl from './getApiUrl';

export const searchMovies = async (
  params: RequestParams,
): Promise<{
  movies: Movie[];
  error: string;
  totalResults: string;
}> => {
  const url = getApiUrl(params);

  const res = await fetch(url);

  const data = (await res.json()) as MovieSearchResponse;

  if (data.Response === 'True') {
    return { movies: data.Search, error: '', totalResults: data.totalResults };
  } else {
    return { movies: [], error: data.Error, totalResults: '0' };
  }
};
