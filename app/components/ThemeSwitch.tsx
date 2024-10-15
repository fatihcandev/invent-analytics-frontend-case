'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { Brightness4, Brightness7, DarkMode } from '@mui/icons-material';

import { useThemeActions } from '../redux/hooks/useThemeActions';
import { RootState } from '../redux/store';

const ThemeSwitch = () => {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { toggleTheme } = useThemeActions();
  return (
    <Tooltip title={themeMode === 'dark' ? 'Light mode' : 'Dark mode'}>
      <IconButton
        onClick={() => toggleTheme()}
        sx={{
          display: 'flex',
        }}>
        {themeMode === 'dark' ? <Brightness7 /> : <DarkMode />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeSwitch;
