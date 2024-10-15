import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { setTheme, toggleTheme } from '../slices/themeSlice';

export const useThemeActions = () => {
  const dispatch = useDispatch();

  return useMemo(
    () =>
      bindActionCreators(
        {
          setTheme,
          toggleTheme,
        },
        dispatch,
      ),
    [dispatch],
  );
};
