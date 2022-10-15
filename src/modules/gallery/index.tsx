import GalleryFilter from './components/filter';
import GalleryCollection from './components/collection';
import { observer } from 'mobx-react-lite';
import { FormattedMessage } from 'react-intl';
import {
  ProvideGalleryStore,
  useGalleryStore,
} from './providers/GalleryProvider';
import { useCallback } from 'react';

const Gallery = observer(() => {
  const galleryStore = useGalleryStore();

  const loadMore = useCallback(() => galleryStore.loadMore(), [galleryStore]);

  return (
    <div className='max-w-screen-lg mx-auto flex flex-col space-y-10 pt-28 pb-24 sm:pt-52 text-center px-4'>
      <span className='mb-6 text-4xl sm:text-6xl font-header'>
        <FormattedMessage id='gallery.title' defaultMessage='Gallery' />
      </span>

      <div className='flex flex-col space-y-8 sm:space-y-12'>
        <GalleryFilter />

        <GalleryCollection
          items={galleryStore.displayCollection}
          onLoadMore={loadMore}
        />
      </div>
    </div>
  );
});

const GalleryPage = () => {
  return (
    <ProvideGalleryStore>
      <Gallery />
    </ProvideGalleryStore>
  );
};

export default GalleryPage;
