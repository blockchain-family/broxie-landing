import { useCallback, useEffect, useState } from 'react';
import { breakpointLowQ } from 'utils/responsiveness';

type VideoProps = {
  videoUrl: string;
  mobileImg?: string | undefined;
};

const ResponsiveVideo = (props: VideoProps) => {
  const getVideoSrc = useCallback(() => {
    const scrWidth = window.innerWidth;

    if (scrWidth >= breakpointLowQ) {
      return props.videoUrl;
    }

    return undefined;
  }, [props.videoUrl]);

  const [videoSrc, setVideoSrc] = useState(getVideoSrc());

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(getVideoSrc());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getVideoSrc]);

  if (!videoSrc) {
    return <img className='w-full h-auto' src={props.mobileImg} alt='' />;
  }

  return (
    <video
      className='w-full h-auto pointer-events-none'
      autoPlay
      loop
      muted
      playsInline
      src={videoSrc}
    />
  );
};

export default ResponsiveVideo;
