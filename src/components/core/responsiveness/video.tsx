import { isIOS } from 'react-device-detect';
import { useDesktopMediaQuery } from 'utils/responsiveness';

type VideoProps = {
  videoUrl: string;
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
    >
      <source src={props.videoUrl} type='video/mp4' />
    </video>
  );
};

export default ResponsiveVideo;
