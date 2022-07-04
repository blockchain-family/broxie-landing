import { useMemo } from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';

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

import bg_clouds_high from 'assets/images/landing/header/bg-clouds@2x.webp';
import bg_clouds_mid from 'assets/images/landing/header/bg-clouds@1.5x.webp';
import bg_clouds_low from 'assets/images/landing/header/bg-clouds.webp';

import bg_planets_high from 'assets/images/landing/header/bg-planets@2x.webp';
import bg_planets_mid from 'assets/images/landing/header/bg-planets@1.5x.webp';
import bg_planets_low from 'assets/images/landing/header/bg-planets.webp';

import bg_sky_high from 'assets/images/landing/header/bg-sky@2x.webp';
import bg_sky_mid from 'assets/images/landing/header/bg-sky@1.5x.webp';
import bg_sky_low from 'assets/images/landing/header/bg-sky.webp';

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

const minWidthHigh = '(min-width: 2561px)';
const minWidthMid = '(min-width: 1921px)';
const minWidthLow = '(min-width: 768px)';
const baseWidth = 1920;

type PictureProps = {
  highQ: string;
  midQ: string;
  lowQ: string;
  default?: string | undefined;
};

const Picture = (props: PictureProps) => {
  return (
    <picture>
      <source srcSet={props.highQ} media={minWidthHigh} width={baseWidth * 2} />
      <source srcSet={props.midQ} media={minWidthMid} width={baseWidth * 1.5} />
      <source srcSet={props.lowQ} media={minWidthLow} width={baseWidth} />
      <source srcSet={props.default} />
      <img src={props.default} alt='' />
    </picture>
  );
};

const LandingHeader = () => {
  const layers = useMemo<BannerLayer[]>(
    () => [
      {
        children: (
          <Picture lowQ={bg_sky_low} midQ={bg_sky_mid} highQ={bg_sky_high} />
        ),
        translateY: [-16, 26],
        expanded: false,
      },
      {
        children: (
          <Picture
            lowQ={bg_planets_low}
            midQ={bg_planets_mid}
            highQ={bg_planets_high}
          />
        ),
        translateY: [-12, 25],
        expanded: false,
      },
      {
        children: (
          <Picture
            lowQ={bg_clouds_low}
            midQ={bg_clouds_mid}
            highQ={bg_clouds_high}
          />
        ),
        translateY: [-8, 18],
        expanded: false,
      },
      {
        children: (
          <Picture
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
          <Picture lowQ={bg_town_low} midQ={bg_town_mid} highQ={bg_town_high} />
        ),
        translateY: [-10, 4],
        expanded: false,
      },
      {
        children: (
          <Picture
            lowQ={bg_house_low}
            midQ={bg_house_mid}
            highQ={bg_house_high}
            default={bg_full}
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
        <ParallaxBanner style={{ aspectRatio: '0.779' }} layers={layers} />

        <div className='absolute -bottom-1 bg-gradient-to-t from-black w-full h-24'></div>

        <div className='hidden md:block absolute inset-0 top-1/3'>
          <BecomePart />
        </div>
      </div>

      <div className='hidden md:block translate-y-0 -mt-20 lg:-mt-36 mb-20'>
        <BecomePartDescription />
      </div>

      <div className='md:hidden mt-5 mb-20 flex flex-col gap-8'>
        <BecomePart />
        <BecomePartDescription />
      </div>
    </div>
  );
};

export default LandingHeader;
