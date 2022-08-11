import { isIOS } from 'react-device-detect';
import { useDesktopMediaQuery } from 'utils/responsiveness';

type Video = {
  src: string;
  type: string;
};

type VideoProps = {
  files: Video[];
  mobileImg?: string | undefined;
};

const ResponsiveVideo = (props: VideoProps) => {
  const isDesktop = useDesktopMediaQuery();

  if (!isDesktop || isIOS) {
    return <img className='w-full h-auto' src={props.mobileImg} alt='' />;
  }

  return (
    <video
      className='w-full h-auto pointer-events-none'
      autoPlay
      loop
      playsInline
      muted
      poster={props.mobileImg}
    >
      {props.files.map((x) => (
        <source key={x.src} src={x.src} type={x.type} />
      ))}
    </video>
  );
};

export default ResponsiveVideo;
