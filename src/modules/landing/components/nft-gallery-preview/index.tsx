import nft1 from 'assets/images/landing/body/nft1.png';
import nft2 from 'assets/images/landing/body/nft2.png';
import nft3 from 'assets/images/landing/body/nft3.png';
import nft4 from 'assets/images/landing/body/nft4.png';
import nft5 from 'assets/images/landing/body/nft5.png';

const testData = [
  {
    name: 'Broxie #1',
    src: nft1,
    price: 77.7,
  },
  {
    name: 'Broxie #2',
    src: nft2,
    price: 77.7,
  },
  {
    name: 'Broxie #3',
    src: nft3,
    price: 77.7,
  },
  {
    name: 'Broxie #4',
    src: nft4,
    price: 77.7,
  },
  {
    name: 'Broxie #5',
    src: nft5,
    price: 77.7,
  },
];

const NftGalleryPreview = () => {
  return (
    <div className='h-[20rem] sm:h-[24rem] w-full relative overflow-hidden'>
      <div className='absolute left-0 right-0 flex gap-6 items-start justify-center'>
        {testData.map((x) => (
          <div
            key={x.name}
            className='flex flex-col gap-2 bg-secondaryBg rounded-xl p-2 sm:p-3 shrink-0 max-w-[10rem] sm:max-w-[14rem] even:mt-16'
          >
            <img className='w-full h-auto rounded-xl' src={x.src} alt='' />

            <div className='flex flex-col gap-2 my-4 text-center'>
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
