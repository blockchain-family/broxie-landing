import GalleryCollection from './collection';
import GalleryFilter from './filter';

const GalleryPage = () => {
  return (
    <div className='max-w-screen-lg mx-auto flex flex-col space-y-10 pt-28 pb-10 sm:pt-52'>
      <div className='hidden sm:block text-center mb-6'>
        <span className='text-4xl sm:text-6xl font-header'>Gallery</span>
      </div>

      <GalleryFilter />

      <GalleryCollection />
    </div>
  );
};

export default GalleryPage;
