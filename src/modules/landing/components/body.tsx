import { useIntl } from 'react-intl';
import Utility from './utility';
import NftGalleryPreview from './nft-gallery-preview';
import Container from 'components/core/container';

const LandingBody = () => {
  const intl = useIntl();

  return (
    <div className='flex flex-col space-y-20'>
      <div className='flex flex-col space-y-12 items-center'>
        <NftGalleryPreview />
      </div>

      <Container size='sm' className='flex flex-col space-y-5'>
        <div className='flex flex-col space-y-8 items-center text-center text-lg'>
          <span className='text-4xl sm:text-6xl font-header'>
            {intl.formatMessage({
              id: 'landing.body.become_part',
              defaultMessage: 'Become part of Broxus',
            })}
          </span>

          <span>
            {intl.formatMessage({
              id: 'landing.body.become_part.description.part1',
              defaultMessage:
                'Psst… Hey… Come in here real quick, and don’t say a peep. Word on the street is, these Broxies come with some interesting add-ons. I’ll let you know what I heard, but try to keep it a secret… okay?',
            })}
          </span>

          <span>
            {intl.formatMessage({
              id: 'landing.body.become_part.description.part2',
              defaultMessage:
                "The goal of Broxie is to gather a community of homies and give them benefits in this world. What benefits exactly? You'll find out soon, we have big plans.",
            })}
          </span>
        </div>
      </Container>

      <Utility />
    </div>
  );
};

export default LandingBody;
