import Button from 'components/core/button';
import SingleSelect, {
  SingleSelectValue,
} from 'components/core/select/single-select';
import { observer } from 'mobx-react-lite';
import { galleryFilterOptions } from 'modules/gallery/models/filters';
import { useGalleryStore } from 'modules/gallery/providers/GalleryProvider';
import { FormattedMessage } from 'react-intl';

type GalleryFilterItemProps = {
  label: string;
  options: SingleSelectValue[];
  value: SingleSelectValue;
  onChange: (newVal: SingleSelectValue) => void;
};

const GalleryFilterItem = ({
  label,
  options,
  value,
  onChange,
}: GalleryFilterItemProps) => {
  return (
    <div className='flex flex-col items-start space-y-1 text-secondaryBg/80'>
      <span className='font-header text-2xl text-primary'>{label}</span>

      <SingleSelect
        options={options}
        value={value}
        onChange={(val) => (val ? onChange(val) : undefined)}
        isSearchable={false}
      />
    </div>
  );
};

const GalleryFilter = observer(() => {
  const galleryStore = useGalleryStore();

  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2'>
        <GalleryFilterItem
          label='Items'
          options={galleryFilterOptions.items}
          value={galleryStore.currentFilter.items}
          onChange={(newVal) => galleryStore.setFilterValue('items', newVal)}
        />

        <GalleryFilterItem
          label='Background'
          options={galleryFilterOptions.back}
          value={galleryStore.currentFilter.back}
          onChange={(newVal) => galleryStore.setFilterValue('back', newVal)}
        />

        <GalleryFilterItem
          label='Body'
          options={galleryFilterOptions.body}
          value={galleryStore.currentFilter.body}
          onChange={(newVal) => galleryStore.setFilterValue('body', newVal)}
        />

        <GalleryFilterItem
          label='Ears'
          options={galleryFilterOptions.ears}
          value={galleryStore.currentFilter.ears}
          onChange={(newVal) => galleryStore.setFilterValue('ears', newVal)}
        />

        <GalleryFilterItem
          label='Head'
          options={galleryFilterOptions.head}
          value={galleryStore.currentFilter.head}
          onChange={(newVal) => galleryStore.setFilterValue('head', newVal)}
        />

        <GalleryFilterItem
          label='Clothes'
          options={galleryFilterOptions.clothes}
          value={galleryStore.currentFilter.clothes}
          onChange={(newVal) => galleryStore.setFilterValue('clothes', newVal)}
        />

        <GalleryFilterItem
          label='Nose'
          options={galleryFilterOptions.nose}
          value={galleryStore.currentFilter.nose}
          onChange={(newVal) => galleryStore.setFilterValue('nose', newVal)}
        />

        <GalleryFilterItem
          label='Neck'
          options={galleryFilterOptions.neck}
          value={galleryStore.currentFilter.neck}
          onChange={(newVal) => galleryStore.setFilterValue('neck', newVal)}
        />

        <GalleryFilterItem
          label='Accessory top'
          options={galleryFilterOptions.accessory_top}
          value={galleryStore.currentFilter.accessory_top}
          onChange={(newVal) =>
            galleryStore.setFilterValue('accessory_top', newVal)
          }
        />

        <GalleryFilterItem
          label='Accessory bottom'
          options={galleryFilterOptions.accessory_down}
          value={galleryStore.currentFilter.accessory_down}
          onChange={(newVal) =>
            galleryStore.setFilterValue('accessory_down', newVal)
          }
        />

        <GalleryFilterItem
          label='Emotion'
          options={galleryFilterOptions.emotions}
          value={galleryStore.currentFilter.emotions}
          onChange={(newVal) => galleryStore.setFilterValue('emotions', newVal)}
        />
      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center space-y-3 px-2'>
        <span>
          <FormattedMessage
            id='gallery.filter.summary'
            defaultMessage='{nftCount} Broxies with these filters'
            values={{
              nftCount: (
                <span className='font-bold'>
                  {galleryStore.filteredCollection.length}
                </span>
              ),
            }}
          />
        </span>

        <Button
          variant='primary'
          size='sm'
          onClick={() => galleryStore.resetFilter()}
        >
          <FormattedMessage
            id='gallery.filter.reset'
            defaultMessage='Reset filter'
          />
        </Button>
      </div>
    </div>
  );
});

export default GalleryFilter;
