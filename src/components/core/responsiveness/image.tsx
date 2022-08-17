import { breakpoints } from 'utils/responsiveness';

const minWidthHigh = `(min-width: ${breakpoints.fullHd}px)`;
const minWidthLow = `(min-width: ${breakpoints.sm}px)`;

export type Image = {
  src: string;
  type: string;
  width: number;
  height: number;
};

type ImageProps = {
  highQ: Image;
  lowQ: Image;
  fallbackImg?: Image;
};

const ResponsiveImage = (props: ImageProps) => {
  return (
    <picture className='w-full h-auto'>
      <source
        srcSet={props.highQ.src}
        type={props.highQ.type}
        width={props.highQ.width}
        height={props.highQ.height}
        media={minWidthHigh}
      />
      <source
        srcSet={props.lowQ.src}
        type={props.lowQ.type}
        width={props.lowQ.width}
        height={props.lowQ.height}
        media={minWidthLow}
      />
      <img
        className='w-full h-auto'
        src={props.fallbackImg?.src}
        width={props.fallbackImg?.width}
        height={props.fallbackImg?.height}
        alt=''
      />
    </picture>
  );
};

export default ResponsiveImage;
