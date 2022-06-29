import { useMemo } from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';

import bg_sky from 'assets/images/landing/header/bg-sky.jpg';
import bg_planets from 'assets/images/landing/header/bg-planets.png';
import bg_clouds from 'assets/images/landing/header/bg-clouds.png';
import bg_rocks from 'assets/images/landing/header/bg-rocks.png';
import bg_town from 'assets/images/landing/header/bg-town.png';
import bg_house from 'assets/images/landing/header/bg-house.png';
import bg_bushes from 'assets/images/landing/header/bg-bushes.png';
import bg_constellation from 'assets/images/landing/header/bg-constellation.png';
import bg_mobile from 'assets/images/landing/header/bg-mobile.jpg';

const BecomePart = () => {
  return (
    <div className='flex flex-col gap-2 text-center px-4'>
      <h1 className='font-header text-5xl md:text-7xl'>
        Become part of Broxus
      </h1>
      <span className='hidden md:inline text-xs md:text-base opacity-50'>
        Scroll for membership
      </span>
    </div>
  );
};

const BecomePartDescription = () => {
  return (
    <div className='max-w-xs md:max-w-xl mx-auto text-center text-lg flex flex-col gap-5'>
      <span>
        Broxie is literally the existing world of hard workers from Broxus. They
        create, work and brainstorm every day, contributing to the development
        of the Everscale ecosystem.
      </span>

      <span>
        Broxie is not a position in a company, it is a collective image of
        ordinary guys who live in the web3.0 universe, are driven by pure
        self-realization and believe that the main value in this world is
        working with kindred spirits.
      </span>

      <span>
        For our friends, we present a collection of 2000 unique digital
        portraits living in the friendliest atmosphere.
      </span>
    </div>
  );
};

const TopDesktop = () => {
  const layers = useMemo<BannerLayer[]>(
    () => [
      {
        image: bg_sky,
        translateY: [-16, 26],
        expanded: false,
      },
      {
        image: bg_planets,
        translateY: [-12, 25],
        expanded: false,
      },
      {
        image: bg_clouds,
        translateY: [-8, 18],
        expanded: false,
      },
      {
        image: bg_rocks,
        translateY: [-12, 15],
        expanded: false,
      },
      {
        image: bg_town,
        translateY: [-10, 4],
        expanded: false,
      },
      {
        image: bg_house,
        expanded: false,
      },
      {
        image: bg_bushes,
        expanded: false,
      },
      {
        image: bg_constellation,
        expanded: false,
      },
    ],
    []
  );

  return (
    <div className='hidden md:block'>
      <div className='relative'>
        <ParallaxBanner style={{ aspectRatio: '0.779' }} layers={layers} />

        <div className='hidden 3xl:block absolute top-0 bottom-0 -left-1 bg-gradient-to-r from-black w-8'></div>
        <div className='hidden 3xl:block absolute top-0 bottom-0 -right-1 bg-gradient-to-l from-black w-8'></div>
        <div className='absolute -bottom-1 bg-gradient-to-t from-black w-full h-24'></div>

        <div className='absolute inset-0 top-1/3'>
          <BecomePart />
        </div>
      </div>

      <div className='translate-y-0 -mt-20 lg:-mt-36 mb-20'>
        <BecomePartDescription />
      </div>
    </div>
  );
};

const TopMobile = () => {
  return (
    <div className='md:hidden'>
      <div className='relative'>
        <img src={bg_mobile} alt='' />
        <div className='absolute -bottom-1 bg-gradient-to-t from-black w-full h-24'></div>
      </div>

      <div className='mt-5 mb-20 flex flex-col gap-8'>
        <BecomePart />
        <BecomePartDescription />
      </div>
    </div>
  );
};

const LandingHeader = () => {
  return (
    <div className='relative'>
      <TopMobile />
      <TopDesktop />
    </div>
  );
};

export default LandingHeader;
