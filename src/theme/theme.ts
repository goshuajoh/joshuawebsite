// src/theme/theme.ts
import { ThemeMode, ThemeColors } from './types';

export const themeColors: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#ffffff',
    text: '#2D3748',
    primary: '#3B82F6',
    secondary: '#6366F1',
    accent: '#EC4899'
  },
  dark: {
    background: '#1A202C',
    text: '#F7FAFC',
    primary: '#60A5FA',
    secondary: '#818CF8',
    accent: '#F472B6'
  }
};