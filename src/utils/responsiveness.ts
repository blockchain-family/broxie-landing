import { useMediaQuery } from 'react-responsive';

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  fullHd: 1921,
  quadHd: 2561,
};

export const useDesktopMediaQuery = () =>
  useMediaQuery({ minWidth: breakpoints.sm });
