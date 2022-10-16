import ExternalLink from 'components/core/external-link';
import { useCallback } from 'react';
import { BroxieNft } from 'modules/gallery/stores/GalleryStore';
import { useStaticData } from 'providers/StaticDataProvider';
import { FormattedMessage } from 'react-intl';
import { cutString } from 'utils/strings';

const BroxieDetails = ({ broxie }: { broxie: BroxieNft }) => {
  const staticData = useStaticData();

  const getAttributeName = useCallback((attr: string) => {
    if (attr === 'accessory_top') {
      return 'acccessory top';
    }

    if (attr === 'accessory_down') {
      return 'acccessory bottom';
    }

    return attr;
  }, []);

  return (
    <div className='flex flex-col text-black space-y-2'>
      <div className='flex items-center justify-center py-2'>
        <span className='text-lg'>{broxie.name}</span>
      </div>

      <div className='w-full flex flex-col items-center space-y-4 sm:space-y-6'>
        <img
          className='max-w-[280px] sm:max-w-[360px] w-full h-auto rounded-xl'
          src={broxie.previewUrl}
          alt={broxie.name}
          width={512}
          height={512}
        />

        <div className='w-full flex flex-col space-y-1 overflow-hidden text-ellipsis text-center'>
          <ExternalLink
            href={`${staticData.urls.everscan}/accounts/${broxie.address}`}
            className='!text-secondaryBg/80'
          >
            {cutString(broxie.address, 6, 20)}
          </ExternalLink>
          <ExternalLink href={broxie.ipfsUrl}>
            <FormattedMessage
              id='gallery.nft.image_ipfs'
              defaultMessage='Image IPFS link'
            />
          </ExternalLink>
        </div>

        <div className='w-full grid grid-cols-3 sm:grid-cols-5 gap-x-2 gap-y-1 text-sm'>
          {broxie.attributes.map((x) => (
            <div key={x.trait_type} className='flex flex-col'>
              <span className='font-header'>
                {getAttributeName(x.trait_type)}
              </span>
              <span>{x.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BroxieDetails;
