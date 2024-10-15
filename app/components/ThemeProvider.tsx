'use client';

import { useMemo } from 'react';
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: 'AvenirNextLTPro, sans-serif',
        },
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
