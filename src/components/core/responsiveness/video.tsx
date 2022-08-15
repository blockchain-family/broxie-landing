import { isIOS } from 'react-device-detect';
import { useLgMediaQuery } from 'utils/responsiveness';

type Video = {
  src: string;
  type: string;
};

type VideoProps = {
  files: Video[];
  mobileImg?: { src: string; width: number; height: number };
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
      poster={props.mobileImg?.src}
    >
      {props.files.map((x) => (
        <source key={x.src} src={x.src} type={x.type} />
      ))}
    </video>
  );
};

export default ResponsiveVideo;
