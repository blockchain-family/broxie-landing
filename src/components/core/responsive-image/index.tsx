import {
  breakpointHighQ,
  breakpointLowQ,
  breakpointMidQ,
} from 'utils/responsiveness';

const minWidthHigh = `(min-width: ${breakpointHighQ}px)`;
const minWidthMid = `(min-width: ${breakpointMidQ}px)`;
const minWidthLow = `(min-width: ${breakpointLowQ}px)`;

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
