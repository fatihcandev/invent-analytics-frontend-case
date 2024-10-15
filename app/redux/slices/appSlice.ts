import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '@/app/types';

interface AppState {
  movies: Movie[];
  clickedMovie: Movie | null;
  searchTerm: string;
  type: string;
  year: string;
  page: number;
  totalResults: number;
  loading: boolean;
  errorMessage: string;
}

const initialState: AppState = {
  movies: [],
  clickedMovie: null,
  searchTerm: 'Pokemon',
  type: 'movie',
  year: '',
  page: 1,
  totalResults: 0,
  loading: false,
  errorMessage: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMovies: (
      state,
      action: PayloadAction<Pick<AppState, 'movies' | 'totalResults'>>,
    ) => {
      state.movies = action.payload.movies;
      state.totalResults = action.payload.totalResults;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setMovies,
  setLoading,
  setErrorMessage,
  setSearchTerm,
  setType,
  setYear,
  setPage,
} = appSlice.actions;
export default appSlice.reducer;
