import { useMediaQuery } from 'react-responsive';

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  fullHd: 1921,
  quadHd: 2561,
};

export const useSmMediaQuery = () =>
  useMediaQuery({ minWidth: breakpoints.sm });

export const useMdMediaQuery = () =>
  useMediaQuery({ minWidth: breakpoints.md });

export const useLgMediaQuery = () =>
  useMediaQuery({ minWidth: breakpoints.lg });
