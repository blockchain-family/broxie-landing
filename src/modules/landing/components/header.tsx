import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useSmMediaQuery } from 'utils/responsiveness';
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
  const intl = useIntl();

  return (
    <div className='flex flex-col space-y-2 text-center px-4'>
      <h1 className='font-header text-5xl sm:text-6xl md:text-8xl lg:text-9xl'>
        {intl.formatMessage({
          id: 'landing.header.become_part',
          defaultMessage: 'Become part of Broxus',
        })}
      </h1>
      <span className='hidden sm:inline text-xs sm:text-xl opacity-50'>
        {intl.formatMessage({
          id: 'landing.header.scroll_for_membership',
          defaultMessage: 'Scroll for membership',
        })}
      </span>
    </div>
  );
};

const BecomePartDescription = () => {
  const intl = useIntl();

  return (
    <Container
      size='sm'
      className='text-center text-lg flex flex-col space-y-8'
    >
      <span>
        {intl.formatMessage({
          id: 'landing.header.broxie.description.part1',
          defaultMessage:
            'Broxie represents a world of hard workers from Broxus. They create, work and brainstorm every day, contributing to the development of the Everscale ecosystem.',
        })}
      </span>

      <span>
        {intl.formatMessage({
          id: 'landing.header.broxie.description.part2',
          defaultMessage:
            'Broxie is not a position in a company, it is a collective of ordinary people who live in the web3 universe, are driven by a shared pursuit of self-realization and believe that there is nothing better in this world than working with kindred spirits.',
        })}
      </span>

      <span>
        {intl.formatMessage({
          id: 'landing.header.broxie.description.part3',
          defaultMessage:
            'For our friends, we present a collection of numerous unique digital portraits living in the friendliest atmosphere imaginable.',
        })}
      </span>
    </Container>
  );
};

const imgResolution = {
  low: {
    w: 1920,
    h: 2463,
  },
  mid: {
    w: 2880,
    h: 3694,
  },
  high: {
    w: 3840,
    h: 4925,
  },
};

const LandingHeader = () => {
  const isDesktop = useSmMediaQuery();

  const layers = useMemo<BannerLayer[]>(
    () => [
      {
        children: (
          <ResponsiveImage
            lowQ={{
              src: bg_sky_low,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            midQ={{
              src: bg_sky_mid,
              type: 'image/webp',
              width: imgResolution.mid.w,
              height: imgResolution.mid.h,
            }}
            highQ={{
              src: bg_sky_high,
              type: 'image/webp',
              width: imgResolution.high.w,
              height: imgResolution.high.h,
            }}
          />
        ),
        translateY: [-16, 26],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={{
              src: bg_rocks_low,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            midQ={{
              src: bg_rocks_mid,
              type: 'image/webp',
              width: imgResolution.mid.w,
              height: imgResolution.mid.h,
            }}
            highQ={{
              src: bg_rocks_high,
              type: 'image/webp',
              width: imgResolution.high.w,
              height: imgResolution.high.h,
            }}
          />
        ),
        translateY: [-12, 15],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={{
              src: bg_town_low,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            midQ={{
              src: bg_town_mid,
              type: 'image/webp',
              width: imgResolution.mid.w,
              height: imgResolution.mid.h,
            }}
            highQ={{
              src: bg_town_high,
              type: 'image/webp',
              width: imgResolution.high.w,
              height: imgResolution.high.h,
            }}
          />
        ),
        translateY: [-10, 4],
        expanded: false,
      },
      {
        children: (
          <ResponsiveImage
            lowQ={{
              src: bg_house_low,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            midQ={{
              src: bg_house_mid,
              type: 'image/webp',
              width: imgResolution.mid.w,
              height: imgResolution.mid.h,
            }}
            highQ={{
              src: bg_house_high,
              type: 'image/webp',
              width: imgResolution.high.w,
              height: imgResolution.high.h,
            }}
            fallbackImg={{
              src: bg_full,
              type: 'image/jpeg',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
          />
        ),
        expanded: false,
      },
    ],
    []
  );

  const paddingAspectRatio = useMemo(
    () => (1 / (imgResolution.high.w / imgResolution.high.h)) * 100,
    []
  );

  return (
    <div>
      <div className='relative'>
        {isDesktop ? (
          <ParallaxBanner
            layers={layers}
            style={{
              paddingBottom: `${paddingAspectRatio}%`,
            }}
          />
        ) : (
          <img
            className='w-full h-auto'
            src={bg_full}
            width={imgResolution.low.w}
            height={imgResolution.low.h}
            alt=''
          />
        )}

        <div className='absolute -bottom-1 bg-gradient-to-t from-black to-transparent w-full h-24' />

        {isDesktop && (
          <div className='absolute top-1/3 bottom-0 left-0 right-0'>
            <BecomePart />
          </div>
        )}
      </div>

      {isDesktop ? (
        <div className='translate-y-0 -mt-20 lg:-mt-36 mb-24'>
          <BecomePartDescription />
        </div>
      ) : (
        <div className='mt-5 mb-16 flex flex-col space-y-8'>
          <BecomePart />
          <BecomePartDescription />
        </div>
      )}
    </div>
  );
};

export default LandingHeader;
