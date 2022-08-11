import {
  quadHdBreakpoint,
  fullHdBreakpoint,
  mobileBreakpoint,
} from 'utils/responsiveness';

const minWidthHigh = `(min-width: ${quadHdBreakpoint}px)`;
const minWidthMid = `(min-width: ${fullHdBreakpoint}px)`;
const minWidthLow = `(min-width: ${mobileBreakpoint}px)`;

type ImageProps = {
  highQ: string;
  midQ: string;
  lowQ: string;
  fallbackImg?: string | undefined;
};

const ResponsiveImage = (props: ImageProps) => {
  return (
    <picture className='w-full h-auto'>
      <source srcSet={props.highQ} media={minWidthHigh} type='image/webp' />
      <source srcSet={props.midQ} media={minWidthMid} type='image/webp' />
      <source srcSet={props.lowQ} media={minWidthLow} type='image/webp' />
      <img src={props.fallbackImg} alt='' />
    </picture>
  );
};

export default ResponsiveImage;
