import { ReactComponent as GalleryFilterBgSvg } from 'assets/images/gallery/gallery-filter-bg.svg';

const GalleryFilter = () => {
  return (
    <div className='hidden sm:block'>
      <GalleryFilterBgSvg className='w-full h-auto' />
    </div>
  );
};

export default GalleryFilter;
