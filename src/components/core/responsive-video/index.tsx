import { useEffect, useState } from 'react';
import { breakpointLowQ } from 'utils/responsiveness';

type VideoProps = {
  videoUrl: string;
  mobileImg?: string | undefined;
};

const getShowImage = () => {
  const scrWidth = window.innerWidth;

  return scrWidth < breakpointLowQ;
};

const ResponsiveVideo = (props: VideoProps) => {
  const [showImage, setShowImage] = useState(getShowImage());

  useEffect(() => {
    const handleResize = () => {
      setShowImage(getShowImage());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (showImage) {
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
