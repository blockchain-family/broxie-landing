const minWidthHigh = '(min-width: 2561px)';
const minWidthMid = '(min-width: 1921px)';
const minWidthLow = '(min-width: 641px)';

type ImageProps = {
  highQ: string;
  midQ: string;
  lowQ: string;
  baseWidth: number;
  default?: string | undefined;
};

const ResponsiveImage = (props: ImageProps) => {
  return (
    <picture>
      <source
        srcSet={props.highQ}
        media={minWidthHigh}
        width={props.baseWidth * 2}
      />
      <source
        srcSet={props.midQ}
        media={minWidthMid}
        width={props.baseWidth * 1.5}
      />
      <source srcSet={props.lowQ} media={minWidthLow} width={props.baseWidth} />
      <source srcSet={props.default} />
      <img src={props.default} alt='' />
    </picture>
  );
};

export default ResponsiveImage;
