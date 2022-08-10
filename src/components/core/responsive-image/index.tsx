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
  mobileImg?: string | undefined;
};

const ResponsiveImage = (props: ImageProps) => {
  return (
    <picture className='w-full h-auto'>
      <source srcSet={props.highQ} media={minWidthHigh} />
      <source srcSet={props.midQ} media={minWidthMid} />
      <source srcSet={props.lowQ} media={minWidthLow} />
      <source srcSet={props.mobileImg} />
      <img src={props.mobileImg} alt='' />
    </picture>
  );
};

export default ResponsiveImage;
