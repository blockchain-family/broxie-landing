import { useMemo } from 'react';
import { ParallaxBanner } from 'react-scroll-parallax';
import { BannerLayer } from 'react-scroll-parallax/dist/components/ParallaxBanner/types';
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

const aspectRatio = (3840 / 4748).toString();

const LandingFooter = () => {
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
    <div>
      <div className='relative'>
        <ParallaxBanner style={{ aspectRatio: aspectRatio }} layers={layers} />

        <div className='absolute -top-1 bg-gradient-to-b from-black w-full h-12' />
      </div>
    </div>
  );
};

export default LandingFooter;
