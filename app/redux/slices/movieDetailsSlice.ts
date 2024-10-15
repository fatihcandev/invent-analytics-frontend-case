import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '@/app/types';

interface MovieDetailsState {
  movie: Movie | null;
  loading: boolean;
  errorMessage: string;
}

const initialState: MovieDetailsState = {
  movie: null,
  loading: false,
  errorMessage: '',
};

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setMovie, setLoading, setErrorMessage } =
  movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
