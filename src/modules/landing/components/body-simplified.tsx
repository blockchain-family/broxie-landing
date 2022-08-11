import Container from 'components/core/container';
import NftGalleryPreview from './nft-gallery-preview';
import UtilityButton from './utility-button';

const LandingBodySimplified = () => {
  return (
    <div className='flex flex-col space-y-20'>
      <div className='flex flex-col space-y-12 items-center'>
        <NftGalleryPreview />
      </div>

      <Container size='sm' className='flex flex-col space-y-5'>
        <div className='flex flex-col space-y-8 items-center text-center text-lg'>
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

export default LandingBodySimplified;
