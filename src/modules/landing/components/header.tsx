import { useMemo } from 'react';
import { useStaticData } from 'providers/StaticDataProvider';
import { FormattedMessage, useIntl } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { useSmMediaQuery } from 'utils/responsiveness';
import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';
import { FaDiscord, FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';

import Button from 'components/core/button';
import Container from 'components/core/container';
import ResponsiveImage from 'components/core/responsiveness/image';
import ExternalLink from 'components/core/external-link';

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
import { useLayoutStore } from 'providers/LayoutStoreProvider';

const MintStartsSoon = () => {
  const intl = useIntl();
  const staticData = useStaticData();
  const layoutStore = useLayoutStore();

  const links = useMemo(
    () => [
      { url: staticData.urls.broxie.twitter, icon: <FaTwitter /> },
      { url: staticData.urls.broxie.discord, icon: <FaDiscord /> },
      { url: staticData.urls.broxie.telegram, icon: <FaTelegram /> },
      { url: staticData.urls.broxie.instagram, icon: <FaInstagram /> },
    ],
    [
      staticData.urls.broxie.discord,
      staticData.urls.broxie.instagram,
      staticData.urls.broxie.telegram,
      staticData.urls.broxie.twitter,
    ]
  );

  return (
    <div className='absolute top-[20%] sm:top-[14%] xl:top-[16%] left-0 right-0'>
      <div className='flex justify-center sm:justify-end mx-auto w-full max-w-[120rem] px-2 sm:px-4 xl:px-32'>
        <div className='flex flex-col items-center text-center'>
          <span className='font-header text-3xl lg:text-4xl mb-1'>
            Broxie NFT mint date
          </span>

          <span className='font-header text-2xl lg:text-2xl mb-4'>
            October 14 15:00 UTC
          </span>

          <div className='sm:hidden'>
            <Button
              variant='primary'
              className='!px-6 !mb-6'
              onClick={() => layoutStore.showMyWallet()}
            >
              <span className='text-2xl font-header'>
                {intl.formatMessage({
                  id: 'landing.navbar.my_wallet.buy_broxie',
                  defaultMessage: 'Buy Broxie',
                })}
              </span>
            </Button>
          </div>

          <div className='flex justify-around text-5xl lg:text-6xl space-x-10'>
            {links.map((x) => (
              <ExternalLink
                key={x.url}
                href={x.url}
                className='!text-primary hover:!text-primary/80'
              >
                {x.icon}
              </ExternalLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const staticData = useStaticData();

  return (
    <Container
      size='sm'
      className='text-center text-lg flex flex-col space-y-8'
    >
      <span>
        <FormattedMessage
          id='landing.header.broxie.description.part1'
          defaultMessage={
            'Broxie represents a world of hard workers from {broxus}. They create, work and brainstorm every day, contributing to the development of the {everscale} ecosystem.'
          }
          values={{
            everscale: (
              <ExternalLink href={staticData.urls.everscale}>
                {intl.formatMessage({
                  id: 'landing.main.everscale',
                  defaultMessage: 'Everscale',
                })}
              </ExternalLink>
            ),
            broxus: (
              <ExternalLink href={staticData.urls.broxus}>
                {intl.formatMessage({
                  id: 'landing.main.broxus',
                  defaultMessage: 'Broxus',
                })}
              </ExternalLink>
            ),
          }}
        />
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
  const intl = useIntl();
  const layoutStore = useLayoutStore();
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
          <div className='absolute top-[25%] bottom-0 left-0 right-0'>
            <div className='flex items-center justify-center mb-12'>
              <Button
                variant='primary'
                className='!px-12'
                onClick={() => layoutStore.showMyWallet()}
              >
                <span className='text-4xl font-header'>
                  {intl.formatMessage({
                    id: 'landing.navbar.my_wallet.buy_broxie',
                    defaultMessage: 'Buy Broxie',
                  })}
                </span>
              </Button>
            </div>

            <BecomePart />
          </div>
        )}

        <MintStartsSoon />
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
