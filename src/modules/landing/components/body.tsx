import BroxieRoutes from 'routes';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import Utility from './utility';
import NftGalleryPreview from './nft-gallery-preview';
import Container from 'components/core/container';
import NftPriceProgress from './nft-price-progress';
import Button from 'components/core/button';

const LandingBody = () => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();

  return (
    <div className='flex flex-col space-y-20'>
      <div className='flex flex-col items-center space-y-12 px-2'>
        <Container
          size='sm'
          className='flex flex-col space-y-8 items-center text-center text-lg'
        >
          <span className='text-4xl sm:text-6xl font-header'>
            {intl.formatMessage({
              id: 'landing.body.lives_on',
              defaultMessage:
                'Lives on the Everscale blockchain and hosted on IPFS',
            })}
          </span>

          <Link
            to={BroxieRoutes.provenance_record.path}
            className='text-link text-xl uppercase underline'
          >
            {intl.formatMessage({
              id: 'landing.body.record_and_proof',
              defaultMessage: 'Record and proof',
            })}
          </Link>
        </Container>

        <NftPriceProgress />

        <Button
          variant='primary'
          className='!px-6'
          onClick={() => layoutStore.showMyWallet()}
        >
          <span className='text-lg'>
            {intl.formatMessage({
              id: 'landing.body.buy_broxie',
              defaultMessage: 'Buy Broxie',
            })}
          </span>
        </Button>
      </div>

      <div className='flex flex-col items-center'>
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
