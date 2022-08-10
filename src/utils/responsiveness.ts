import { useMediaQuery } from 'react-responsive';

export const quadHdBreakpoint = 2561;
export const fullHdBreakpoint = 1921;
export const mobileBreakpoint = 640;

export const useDesktopMediaQuery = () =>
  useMediaQuery({ minWidth: mobileBreakpoint });
