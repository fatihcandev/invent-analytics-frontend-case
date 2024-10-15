import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setErrorMessage,
  setLoading,
  setMovie,
} from '../slices/movieDetailsSlice';

export const useMovieDetailsActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      bindActionCreators(
        {
          setErrorMessage,
          setLoading,
          setMovie,
        },
        dispatch,
      ),
    [dispatch],
  );
};
