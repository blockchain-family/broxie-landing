import ExternalLink from 'components/core/external-link';

import { BroxieNft } from 'modules/gallery/stores/GalleryStore';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const GalleryCollection = ({
  items,
  onLoadMore,
}: {
  items: BroxieNft[];
  onLoadMore: () => void;
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) {
      return;
    }

    onLoadMore();
  }, [inView, onLoadMore]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8'>
      {items.map((x, i) => (
        <ExternalLink key={x.id} href={x.ipfsUrl}>
          <div
            className='mx-auto max-w-[20rem] flex flex-col flex-shrink-0 bg-secondaryBg rounded-xl p-2'
            ref={i === items.length - 1 ? ref : undefined}
          >
            <img
              className='w-full h-auto rounded-xl'
              src={x.previewUrl}
              alt={x.name}
              width={512}
              height={512}
            />

            <span className='my-7 text-primary'>{x.name}</span>
          </div>
        </ExternalLink>
      ))}
    </div>
  );
};

export default GalleryCollection;
