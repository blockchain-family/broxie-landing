import { ParallaxProvider } from 'react-scroll-parallax';
import LandingBody from './components/body';
import LandingFooter from './components/footer';
import LandingHeader from './components/header';

const LandingPage = () => {
  return (
    <ParallaxProvider>
      <div className='max-w-screen-4k mx-auto'>
        <LandingHeader />
        <LandingBody />
        <LandingFooter />
      </div>
    </ParallaxProvider>
  );
};

export default LandingPage;
