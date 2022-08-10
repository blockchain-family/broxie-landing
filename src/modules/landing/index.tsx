import { ParallaxProvider } from 'react-scroll-parallax';
import LandingBodySimplified from './components/body-simplified';
import LandingFooter from './components/footer';
import LandingHeader from './components/header';

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div className='max-w-screen-4k mx-auto'>
        <LandingHeader />
        <LandingBodySimplified />
        <LandingFooter />
      </div>
    </ParallaxProvider>
  );
};

export default LandingPage;
