import placeholderSrc from 'assets/images/nft-placeholder.png';
import Button from 'components/core/button';

const testItems = [] as { imgSrc: string; name: string; price: number }[];

for (let i = 0; i < 12; i++) {
  testItems.push({
    imgSrc: placeholderSrc,
    name: `Broxie #${i + 1}`,
    price: 77.56,
  });
}

const GalleryCollection = () => {
  return (
    <div className='flex flex-col space-y-8 sm:space-y-24'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8'>
        {testItems.map((x, i) => (
          <div
            key={i}
            className='mx-auto max-w-[20rem] flex flex-col space-y-4 bg-secondaryBg rounded-xl p-3 shrink-0'
          >
            <img className='w-full h-auto rounded-xl' src={x.imgSrc} alt='' />

            <div className='flex flex-col space-y-2 my-2 text-center'>
              <span className='text-lg'>{x.name}</span>
              <span className='opacity-40'>{x.price} EVER</span>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center'>
        <Button variant='tertiary'>
          <span className='px-2'>Load more</span>
        </Button>
      </div>
    </div>
  );
};

export default GalleryCollection;
