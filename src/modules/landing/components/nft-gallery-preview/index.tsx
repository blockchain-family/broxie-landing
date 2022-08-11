import nft1 from 'assets/images/landing/body/nft1.jpg';
import nft2 from 'assets/images/landing/body/nft2.jpg';
import nft3 from 'assets/images/landing/body/nft3.jpg';
import nft4 from 'assets/images/landing/body/nft4.jpg';
import nft5 from 'assets/images/landing/body/nft5.jpg';

const testData = [
  {
    name: 'King Everscale',
    src: nft1,
    price: 77.7,
  },
  {
    name: 'Mexican',
    src: nft2,
    price: 77.7,
  },
  {
    name: 'Rap Star',
    src: nft3,
    price: 77.7,
  },
  {
    name: 'Medieval',
    src: nft4,
    price: 77.7,
  },
  {
    name: 'Space Vampire',
    src: nft5,
    price: 77.7,
  },
];

const NftGalleryPreview = () => {
  return (
    <div className='h-[20rem] sm:h-[24rem] w-full relative overflow-hidden'>
      <div className='absolute left-0 right-0 flex space-x-6 items-start justify-center'>
        {testData.map((x) => (
          <div
            key={x.name}
            className='flex flex-col space-y-4 bg-secondaryBg rounded-xl p-2 sm:p-3 shrink-0 max-w-[10rem] sm:max-w-[14rem] even:mt-16'
          >
            <img className='w-full h-auto rounded-xl' src={x.src} alt='' />

            <div className='flex flex-col space-y-2 pb-2 text-center'>
              <span>{x.name}</span>
              {/* <span className='opacity-40 text-sm'>{x.price} EVER</span> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGalleryPreview;
