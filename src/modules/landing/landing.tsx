import { ParallaxProvider } from 'react-scroll-parallax';
import LandingHeader from './components/header';

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div className='max-w-screen-4k mx-auto'>
        <LandingHeader />
      </div>
    </ParallaxProvider>
  );
};

export default LandingPage;
