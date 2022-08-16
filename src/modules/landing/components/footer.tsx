import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as ImageCutSvg } from 'assets/images/landing/footer/image-cut.svg';

import Faq from './faq';
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

  const intl = useIntl();

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
          <span className='text-4xl sm:text-6xl font-header'>
            {intl.formatMessage({
              id: 'landing.footer.how_it_works',
              defaultMessage: 'How it works',
            })}
          </span>

          <span>
            {intl.formatMessage({
              id: 'landing.footer.how_it_works.description.part1',
              defaultMessage:
                'There are going to be a number of different Broxies and each will be completely unique. Each Broxie will be created via random selection from a pool of characteristics that we have put together that is representative of the Broxus and web3 community.',
            })}
          </span>

          <span>
            {intl.formatMessage({
              id: 'landing.footer.how_it_works.description.part2',
              defaultMessage:
                'During the drop period, you won’t know what Broxie you end up with until 14 days after the drop has ended. The Broxus NFTs have been already been created but they won’t be officially allocated until the drop ends. Once the drop ends, we will use a random distribution mechanism to ensure that the process is fair for everyone. Because we anticipate a high demand, each user (wallet) will be allowed to buy at most 254 Broxies.',
            })}
          </span>

          <span>
            {intl.formatMessage({
              id: 'landing.footer.how_it_works.description.part3',
              defaultMessage:
                'The drop will start (TBA). After 14 days, or all the Broxies have been accounted for (whichever comes first), the drop period will end and the order of distribution will be determined.',
            })}
          </span>
        </div>
      </Container>

      <Container size='sm'>
        <Faq />
      </Container>
    </div>
  );
};

export default LandingFooter;
