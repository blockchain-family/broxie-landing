import { useCallback, useMemo } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';

import { ReactComponent as BroxieSvg } from 'assets/images/broxie.svg';

import Container from 'components/core/container';
import ResponsiveImage from 'core/responsive-image';

import bg_full from 'assets/images/landing/footer/bg-full.jpg';

import bg_bar_high from 'assets/images/landing/footer/bg-bar@2x.webp';
import bg_bar_mid from 'assets/images/landing/footer/bg-bar@1.5x.webp';
import bg_bar_low from 'assets/images/landing/footer/bg-bar.webp';

import bg_ceiling_high from 'assets/images/landing/footer/bg-ceiling@2x.webp';
import bg_ceiling_mid from 'assets/images/landing/footer/bg-ceiling@1.5x.webp';
import bg_ceiling_low from 'assets/images/landing/footer/bg-ceiling.webp';

import bg_beach_high from 'assets/images/landing/footer/bg-beach@2x.webp';
import bg_beach_mid from 'assets/images/landing/footer/bg-beach@1.5x.webp';
import bg_beach_low from 'assets/images/landing/footer/bg-beach.webp';

import bg_tentacles_high from 'assets/images/landing/footer/bg-tentacles@2x.webp';
import bg_tentacles_mid from 'assets/images/landing/footer/bg-tentacles@1.5x.webp';
import bg_tentacles_low from 'assets/images/landing/footer/bg-tentacles.webp';

import bg_sky_high from 'assets/images/landing/footer/bg-sky@2x.webp';
import bg_sky_mid from 'assets/images/landing/footer/bg-sky@1.5x.webp';
import bg_sky_low from 'assets/images/landing/footer/bg-sky.webp';

import imageCut from 'assets/images/landing/footer/image-cut.svg';
import SocialButtons from './social-buttons';

const aspectRatio = (3840 / 4748).toString();

const LandingFooter = () => {
  const goUpClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const layers = useMemo<BannerLayer[]>(
    () => [
      {
        children: (
          <ResponsiveImage
            lowQ={bg_sky_low}
            midQ={bg_sky_mid}
            highQ={bg_sky_high}
            baseWidth={1920}
          />
        ),
        translateY: [-10, 26],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_tentacles_low}
            midQ={bg_tentacles_mid}
            highQ={bg_tentacles_high}
            baseWidth={1920}
          />
        ),
        translateY: [-8, 18],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_beach_low}
            midQ={bg_beach_mid}
            highQ={bg_beach_high}
            baseWidth={1920}
          />
        ),
        translateY: [-4, 8],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_bar_low}
            midQ={bg_bar_mid}
            highQ={bg_bar_high}
            baseWidth={1920}
            default={bg_full}
          />
        ),
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_ceiling_low}
            midQ={bg_ceiling_mid}
            highQ={bg_ceiling_high}
            baseWidth={1920}
          />
        ),
        translateY: [-2, 4],
        expanded: false,
      },
    ],
    []
  );

  return (
    <div className='flex flex-col gap-10'>
      <div className='relative'>
        <ParallaxBanner style={{ aspectRatio: aspectRatio }} layers={layers} />

        <div className='absolute -top-1 bg-gradient-to-b from-black w-full h-12' />

        <div
          className='w-full -mt-3 h-5 sm:-mt-6 sm:h-7 md:-mt-10 md:h-14 2xl:-mt-20 2xl:h-24 translate-y-0'
          style={{
            backgroundImage: `url(${imageCut})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
            backgroundSize: '100% auto',
          }}
        />
      </div>

      <Container size='sm' className='flex flex-col'>
        <div className='flex flex-col gap-8 items-center text-center text-lg'>
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

      <SocialButtons />

      <div className='mx-auto flex flex-col gap-5 text-center mb-10'>
        <BroxieSvg className='w-48 md:w-96 h-auto' />

        <span
          className='uppercase underline cursor-pointer'
          onClick={goUpClick}
        >
          Tap to go up
        </span>
      </div>
    </div>
  );
};

export default LandingFooter;
