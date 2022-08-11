import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { breakpoints } from 'utils/responsiveness';

import nft1 from 'assets/images/landing/body/nft1.jpg';
import nft2 from 'assets/images/landing/body/nft2.jpg';
import nft3 from 'assets/images/landing/body/nft3.jpg';
import nft4 from 'assets/images/landing/body/nft4.jpg';
import nft5 from 'assets/images/landing/body/nft5.jpg';

const nftsData = [
  {
    name: 'King Everscale',
    src: nft1,
  },
  {
    name: 'Mexican',
    src: nft2,
  },
  {
    name: 'Rap Star',
    src: nft3,
  },
  {
    name: 'Medieval',
    src: nft4,
  },
  {
    name: 'Space Vampire',
    src: nft5,
  },
];

const NftGalleryPreview = () => {
  return (
    <div className='w-full max-w-7xl'>
      <Swiper
        className='w-full'
        slidesPerView={1.4}
        spaceBetween={20}
        breakpoints={{
          [breakpoints.sm]: { slidesPerView: 2.4 },
          [breakpoints.lg]: { slidesPerView: 5 },
        }}
        centeredSlides
        initialSlide={2}
      >
        {nftsData.map((x) => (
          <SwiperSlide
            key={x.name}
            className='bg-secondaryBg rounded-xl p-2 sm:p-3 even:mt-10'
          >
            <img className='w-full h-auto rounded-xl mb-8' src={x.src} alt='' />

            <div className='text-center mb-6'>
              <span>{x.name}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NftGalleryPreview;
