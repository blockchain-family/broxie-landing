import { useMemo } from 'react';
import { ReactComponent as ImageCutSvg } from 'assets/images/landing/footer/image-cut.svg';

import Container from 'components/core/container';
import ResponsiveVideo from 'components/core/responsiveness/video';

import bg_full_3840_VP9 from 'assets/images/landing/footer/bg-full-3840.webm';
import bg_full_3840 from 'assets/images/landing/footer/bg-full-3840.mp4';
import bg_full_1920 from 'assets/images/landing/footer/bg-full-1920.mp4';
import bg_full_fallback from 'assets/images/landing/footer/bg-full.jpg';

const LandingFooter = () => {
  const videos = useMemo(
    () => [
      { src: bg_full_3840_VP9, type: 'video/webm' },
      { src: bg_full_3840, type: 'video/mp4' },
      { src: bg_full_1920, type: 'video/mp4' },
    ],
    []
  );
  return (
    <div className='flex flex-col space-y-10'>
      <div className='relative overflow-hidden'>
        <ResponsiveVideo
          files={videos}
          mobileImg={{ src: bg_full_fallback, width: 1920, height: 2374 }}
        />

        <div className='absolute -top-1 bg-gradient-to-b from-black to-transparent w-full h-12' />

        <ImageCutSvg className='absolute w-full h-auto top-[98%] left-0 right-0' />
      </div>

      <Container size='sm' className='flex flex-col'>
        <div className='flex flex-col space-y-8 items-center text-center text-lg'>
          <span className='text-4xl sm:text-6xl font-header'>How it works</span>

          <span>
            There are 2000 unique Broxie in total. Each of them is randomly
            generated from a collection of traits created by us, created by our
            employees based on personal views on the image of the inhabitants of
            the future web3.0 world.
          </span>

          <span>
            To ensure a fair distribution, the user will not know which Broxie
            he is buying for the first 14 days after the sale. All NFTs have
            already been generated, but not yet indexed. There is a
            predetermined sequence of portraits, but which one comes first will
            only be determined at the end of the sale using blockchain
            randomness. This method guarantees a fair distribution. Due to
            expected high demand during the initial distribution period, we have
            decided to limit the number of purchased Broxies to no more than 20
            per address.
          </span>

          <span>
            The distribution period starts at 04 July 2022, 04:00 PM (CEST).
            After 10 days or when all the Broxies have been sold (whichever
            comes first), the contribution period ends and it will be determined
            which portrait will get number one and which Broxies will go to you
            accordingly.
          </span>
        </div>
      </Container>
    </div>
  );
};

export default LandingFooter;
