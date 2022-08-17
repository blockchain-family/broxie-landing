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
                'Hey man, I’ve heard some interesting rumors about these Broxies. People are saying that Broxie owners may get special privileges in the Everscale ecosystem and on Broxus platforms. I can’t say for sure, so just keep this between us, alright?',
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
