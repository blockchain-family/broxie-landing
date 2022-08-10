import { useCallback, useEffect, useState } from 'react';
import { breakpointMidQ, breakpointLowQ } from 'utils/responsiveness';

type VideoProps = {
  midQ: string;
  lowQ: string;
  mobileImg?: string | undefined;
};

const ResponsiveVideo = (props: VideoProps) => {
  const getVideoSrc = useCallback(() => {
    const scrWidth = window.innerWidth;

    if (scrWidth >= breakpointMidQ) {
      return props.midQ;
    }

    if (scrWidth >= breakpointLowQ) {
      return props.lowQ;
    }

    return undefined;
  }, [props.lowQ, props.midQ]);

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
