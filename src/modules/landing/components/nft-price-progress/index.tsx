const testData = [
  {
    nftCount: 3000,
    price: 0.1,
    complete: true,
  },
  {
    nftCount: 4000,
    price: 0.3,
    complete: true,
  },
  {
    nftCount: 4000,
    price: 0.5,
    complete: false,
  },
  {
    nftCount: 4000,
    price: 0.9,
    complete: false,
  },
  {
    nftCount: 1000,
    price: 1.7,
    complete: false,
  },
  {
    nftCount: 380,
    price: 3,
    complete: false,
  },
  {
    nftCount: 3,
    price: 100,
    complete: false,
  },
];

const NftPriceProgress = () => {
  return (
    <div className='flex flex-wrap justify-center gap-2'>
      {testData.map((x, i) => (
        <div key={i} className='flex flex-col gap-2 text-center'>
          <span>{x.nftCount} NFTs</span>
          <span
            className={`h-4 w-full rounded-md min-w-[8rem] sm:min-w-[10rem] ${
              x.complete ? 'bg-primaryBg' : 'bg-secondaryBg'
            }`}
          />
          <span className='opacity-40'>{x.price} EVER</span>
        </div>
      ))}
    </div>
  );
};

export default NftPriceProgress;
