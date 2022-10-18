import BroxieDetails from '../broxie-details';

import { BroxieNft } from 'modules/gallery/stores/GalleryStore';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

const GalleryImage = React.forwardRef(
  (
    { broxie, onClick }: { broxie: BroxieNft; onClick: () => void },
    ref: any
  ) => {
    const [loading, setLoading] = useState(true);

    return (
      <div
        className='relative mx-auto w-full max-w-[25rem] flex flex-col flex-shrink-0 bg-secondaryBg rounded-xl p-2'
        ref={ref}
        onClick={onClick}
      >
        {loading && (
          <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
            <BiLoaderAlt className='icon-spin text-5xl text-primaryBg/80' />
          </div>
        )}

        <img
          className='w-full h-auto rounded-xl'
          src={broxie.previewUrl}
          alt={broxie.name}
          width={512}
          height={512}
          onLoad={() => setLoading(false)}
          onError={() => setLoading(false)}
          loading='lazy'
        />

        <span className='my-7 text-primary'>{broxie.name}</span>
      </div>
    );
  }
);

const GalleryCollection = ({
  items,
  onLoadMore,
}: {
  items: BroxieNft[];
  onLoadMore: () => void;
}) => {
  const { ref: lastImageRef, inView: lastImageInView } = useInView();
  const layoutStore = useLayoutStore();

  useEffect(() => {
    if (!lastImageInView) {
      return;
    }

    onLoadMore();
  }, [lastImageInView, onLoadMore]);

  const onBroxieClick = useCallback(
    (nft: BroxieNft) => {
      layoutStore.showContentModal(<BroxieDetails broxie={nft} />, 'md');
    },
    [layoutStore]
  );

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 cursor-pointer'>
      {items.map((x, i) => (
        <GalleryImage
          key={x.id}
          broxie={x}
          ref={i === items.length - 1 ? lastImageRef : undefined}
          onClick={() => onBroxieClick(x)}
        />
      ))}
    </div>
  );
};

export default GalleryCollection;
