import { ParallaxProvider } from 'react-scroll-parallax';
import LandingHeader from './components/header';

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div className='max-w-screen-3xl mx-auto'>
        <LandingHeader />
      </div>
    </ParallaxProvider>
  );
};

export default LandingPage;
