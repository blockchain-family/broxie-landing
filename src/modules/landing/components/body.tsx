import { Link } from 'react-router-dom';
import Container from 'components/core/container';
import NftPriceProgress from './nft-price-progress';
import Button from 'components/core/button/button';
import NftGalleryPreview from './nft-gallery-preview';
import UtilityButton from './utility-button';

const LandingBody = () => {
  return (
    <div className='flex flex-col gap-20'>
      <Container size='sm' className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5 items-center text-center'>
          <span className='text-4xl sm:text-6xl font-header'>
            Lives on Everscale Blockchain
          </span>
          <Link to='/record' className='text-xl text-link underline uppercase'>
            Record and proof
          </Link>
        </div>
      </Container>

      <div className='flex flex-col gap-16 items-center mx-auto px-4 max-w-7xl'>
        <NftPriceProgress />

        <Button variant='primary'>
          <span className='px-3'>Buy Broxie</span>
        </Button>
      </div>

      <div className='flex flex-col gap-12 items-center'>
        <NftGalleryPreview />

        <Link to='/gallery'>
          <Button variant='primary'>
            <span className='px-3'>Go to Gallery</span>
          </Button>
        </Link>
      </div>

      <Container size='sm' className='flex flex-col gap-5'>
        <div className='flex flex-col gap-8 items-center text-center text-lg'>
          <span className='text-4xl sm:text-6xl font-header'>
            Become part of Broxus
          </span>

          <span>
            Psst… Hey… Come in here real quick, and don’t say a peep. Word on
            the street is, these Broxie come with some interesting add-ons. I’ll
            let you know what I heard, but try to keep it a secret… yeah?
          </span>

          <span>
            The goal of Broxie is to gather a community of homies and give them
            preferences in this world. What exactly? You'll find out soon, we
            have big plans.
          </span>
        </div>
      </Container>

      <UtilityButton />
    </div>
  );
};

export default LandingBody;
