import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import {
  setErrorMessage,
  setMovies,
  setPage,
  setYear,
  setLoading,
  setSearchTerm,
  setType,
} from '../slices/appSlice';

export const useAppActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      bindActionCreators(
        {
          setErrorMessage,
          setMovies,
          setPage,
          setYear,
          setLoading,
          setSearchTerm,
          setType,
        },
        dispatch,
      ),
    [dispatch],
  );
};
