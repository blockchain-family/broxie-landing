import placeholderSrc from 'assets/images/landing/nft-placeholder.png';

const testData = [
  {
    name: 'Broxie #1',
    src: placeholderSrc,
    price: 77.7,
  },
  {
    name: 'Broxie #2',
    src: placeholderSrc,
    price: 77.7,
  },
  {
    name: 'Broxie #3',
    src: placeholderSrc,
    price: 77.7,
  },
  {
    name: 'Broxie #4',
    src: placeholderSrc,
    price: 77.7,
  },
  {
    name: 'Broxie #5',
    src: placeholderSrc,
    price: 77.7,
  },
];

const NftGalleryPreview = () => {
  return (
    <div className='h-[20rem] sm:h-[24rem] w-full relative overflow-hidden'>
      <div className='absolute left-0 right-0 flex gap-10 items-start justify-center'>
        {testData.map((x, i) => (
          <div
            key={i}
            className='flex flex-col even:mt-16 gap-2 bg-secondaryBg rounded-xl p-2 shrink-0'
          >
            <img
              className='w-40 sm:w-56 h-auto rounded-xl'
              src={x.src}
              alt=''
            />

            <div className='flex flex-col gap-2 my-2 text-center'>
              <span>{x.name}</span>
              <span className='opacity-40 text-sm'>{x.price} EVER</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NftGalleryPreview;
