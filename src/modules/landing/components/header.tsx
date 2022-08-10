import { useMemo } from 'react';
import { useDesktopMediaQuery } from 'utils/responsiveness';
import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';

import Container from 'components/core/container';
import ResponsiveImage from 'components/core/responsiveness/image';

import bg_full from 'assets/images/landing/header/bg-full.jpg';

import bg_house_high from 'assets/images/landing/header/bg-house@2x.webp';
import bg_house_mid from 'assets/images/landing/header/bg-house@1.5x.webp';
import bg_house_low from 'assets/images/landing/header/bg-house.webp';

import bg_town_high from 'assets/images/landing/header/bg-town@2x.webp';
import bg_town_mid from 'assets/images/landing/header/bg-town@1.5x.webp';
import bg_town_low from 'assets/images/landing/header/bg-town.webp';

import bg_rocks_high from 'assets/images/landing/header/bg-rocks@2x.webp';
import bg_rocks_mid from 'assets/images/landing/header/bg-rocks@1.5x.webp';
import bg_rocks_low from 'assets/images/landing/header/bg-rocks.webp';

import bg_sky_high from 'assets/images/landing/header/bg-sky@2x.webp';
import bg_sky_mid from 'assets/images/landing/header/bg-sky@1.5x.webp';
import bg_sky_low from 'assets/images/landing/header/bg-sky.webp';

const BecomePart = () => {
  return (
    <div className='flex flex-col gap-2 text-center px-4'>
      <h1 className='font-header text-5xl sm:text-6xl md:text-8xl lg:text-9xl'>
        Become part of Broxus
      </h1>
      <span className='hidden sm:inline text-xs sm:text-xl opacity-50'>
        Scroll for membership
      </span>
    </div>
  );
};

const BecomePartDescription = () => {
  return (
    <Container size='sm' className='text-center text-lg flex flex-col gap-8'>
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
    </Container>
  );
};

const LandingHeader = () => {
  const isDesktop = useDesktopMediaQuery();

  const layers = useMemo<BannerLayer[]>(
    () => [
      {
        children: (
          <ResponsiveImage
            lowQ={bg_sky_low}
            midQ={bg_sky_mid}
            highQ={bg_sky_high}
          />
        ),
        translateY: [-16, 26],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_rocks_low}
            midQ={bg_rocks_mid}
            highQ={bg_rocks_high}
          />
        ),
        translateY: [-12, 15],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_town_low}
            midQ={bg_town_mid}
            highQ={bg_town_high}
          />
        ),
        translateY: [-10, 4],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={bg_house_low}
            midQ={bg_house_mid}
            highQ={bg_house_high}
            fallbackImg={bg_full}
          />
        ),
        expanded: false,
      },
    ],
    []
  );

  return (
    <div>
      <div className='relative'>
        {isDesktop ? (
          <ParallaxBanner
            style={{ aspectRatio: (3840 / 4925).toString() }}
            layers={layers}
          />
        ) : (
          <img className='w-full h-auto' src={bg_full} alt='' />
        )}

        <div className='absolute -bottom-1 bg-gradient-to-t from-black w-full h-24' />

        {isDesktop && (
          <div className='absolute inset-0 top-1/3'>
            <BecomePart />
          </div>
        )}
      </div>

      {isDesktop ? (
        <div className='translate-y-0 -mt-20 lg:-mt-36 mb-24'>
          <BecomePartDescription />
        </div>
      ) : (
        <div className='mt-5 mb-16 flex flex-col gap-8'>
          <BecomePart />
          <BecomePartDescription />
        </div>
      )}
    </div>
  );
};

export default LandingHeader;
