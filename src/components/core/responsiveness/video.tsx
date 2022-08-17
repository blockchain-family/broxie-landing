import { isIOS } from 'react-device-detect';
import { useLgMediaQuery } from 'utils/responsiveness';
import { Image } from './image';

type Video = {
  src: string;
  type: string;
};

type VideoProps = {
  width: number;
  height: number;
  files: Video[];
  posterImg?: Image;
  mobileImg?: Image;
  fallbackImg?: Image;
};

const ResponsiveVideo = (props: VideoProps) => {
  const isDesktopWidth = useLgMediaQuery();

  if (!isDesktopWidth || isIOS) {
    return (
      <img
        className='w-full h-auto'
        src={props.mobileImg?.src}
        width={props.mobileImg?.width}
        height={props.mobileImg?.height}
        alt=''
      />
    );
  }

  return (
    <video
      className='w-full h-auto pointer-events-none'
      autoPlay
      loop
      playsInline
      muted
      poster={props.posterImg?.src}
      width={props.width}
      height={props.height}
    >
      {props.files.map((x) => (
        <source key={x.src} src={x.src} type={x.type} />
      ))}
      <img
        className='w-full h-auto'
        src={props.fallbackImg?.src}
        width={props.fallbackImg?.width}
        height={props.fallbackImg?.height}
        alt=''
      />
    </video>
  );
};

export default ResponsiveVideo;
