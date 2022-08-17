import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { useSmMediaQuery } from 'utils/responsiveness';
import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';

import Container from 'components/core/container';
import ResponsiveImage from 'components/core/responsiveness/image';

import bg_house_3840 from 'assets/images/landing/header/bg-house-3840.webp';
import bg_house_1920 from 'assets/images/landing/header/bg-house-1920.webp';

import bg_town_3840 from 'assets/images/landing/header/bg-town-3840.webp';
import bg_town_1920 from 'assets/images/landing/header/bg-town-1920.webp';

import bg_rocks_3840 from 'assets/images/landing/header/bg-rocks-3840.webp';
import bg_rocks_1920 from 'assets/images/landing/header/bg-rocks-1920.webp';

import bg_sky_3840 from 'assets/images/landing/header/bg-sky-3840.webp';
import bg_sky_1920 from 'assets/images/landing/header/bg-sky-1920.webp';

import bg_full_fallback from 'assets/images/landing/header/bg-full-1920.jpg';
import bg_full_mobile from 'assets/images/landing/header/bg-full-960.jpg';

const BecomePart = () => {
  const intl = useIntl();

  const { ref, inView } = useInView({
    rootMargin: '-50% 0% 0% 0%',
  });

  return (
    <div className='flex flex-col space-y-2 text-center px-4 pointer-events-none'>
      <h1 className='font-header text-5xl sm:text-6xl md:text-8xl lg:text-9xl'>
        {intl.formatMessage({
          id: 'landing.header.become_part',
          defaultMessage: 'Become part of Broxus',
        })}
      </h1>

      <span
        ref={ref}
        className={`hidden sm:inline text-xs sm:text-xl opacity-0 transition-opacity ${
          inView ? '!opacity-50' : ''
        }`}
      >
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
            'Broxie is not a position in a company, it is a collective of ordinary people who live in the web3 universe, are driven by a shared pursuit of self-realization, and believe that there is nothing better in this world than working with kindred spirits.',
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
  mobile: {
    w: 960,
    h: 1231,
  },
  low: {
    w: 1920,
    h: 2463,
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
              src: bg_sky_1920,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            highQ={{
              src: bg_sky_3840,
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
              src: bg_rocks_1920,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            highQ={{
              src: bg_rocks_3840,
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
              src: bg_town_1920,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            highQ={{
              src: bg_town_3840,
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
              src: bg_house_1920,
              type: 'image/webp',
              width: imgResolution.low.w,
              height: imgResolution.low.h,
            }}
            highQ={{
              src: bg_house_3840,
              type: 'image/webp',
              width: imgResolution.high.w,
              height: imgResolution.high.h,
            }}
            fallbackImg={{
              src: bg_full_fallback,
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
            src={bg_full_mobile}
            width={imgResolution.mobile.w}
            height={imgResolution.mobile.h}
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
