import { makeAutoObservable, runInAction } from 'mobx';
import { broxieCollection } from 'config/collection';
import { BroxieStore } from 'stores/BroxieStore';
import { BuyBroxieStore } from 'stores/BuyBroxieStore';
import { SingleSelectValue } from 'components/core/select/single-select';
import { galleryFilterDefaultValues } from '../models/filters';
import { getNftShiftedIndex } from 'utils/market';

const itemsPerPage = 30;

export type BroxieNft = {
  id: number;
  name: string;
  previewUrl: string;
  ipfsUrl: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  address: string;
};

export class GalleryStore {
  constructor(
    private broxieStore: BroxieStore,
    private buyBroxieStore: BuyBroxieStore
  ) {
    makeAutoObservable(this);
  }

  private _currentFilter = { ...galleryFilterDefaultValues };
  private _currentPickCount = itemsPerPage;

  get currentFilter() {
    return this._currentFilter;
  }

  get filteredCollection() {
    let resultCollection =
      this._currentFilter.items.value === 'all'
        ? this._collection
        : this._ownedNfts;

    Object.entries(this._currentFilter)
      .filter((x) => x[1] !== this._currentFilter.items)
      .filter((x) => x[1].value !== 'all')
      .forEach((filter) => {
        resultCollection = this.filterTrait(
          resultCollection,
          filter[0],
          filter[1]
        );
      });

    return resultCollection;
  }

  get displayCollection() {
    return this.filteredCollection.slice(0, this._currentPickCount);
  }

  get canLoadMore() {
    return this._currentPickCount < this.filteredCollection.length;
  }

  setFilterValue(filter: string, value: SingleSelectValue) {
    runInAction(() => {
      this._currentFilter[filter] = value;
      this._currentPickCount = itemsPerPage;
    });
  }

  resetFilter() {
    runInAction(() => {
      this._currentFilter = { ...galleryFilterDefaultValues };
      this._currentPickCount = itemsPerPage;
    });
  }

  loadMore() {
    if (!this.canLoadMore) {
      return;
    }

    runInAction(() => {
      this._currentPickCount = this._currentPickCount + itemsPerPage;
    });
  }

  private filterTrait(
    collection: BroxieNft[],
    trait: string,
    value: SingleSelectValue
  ) {
    if (value.value === 'all') {
      return collection;
    }

    return collection.filter((x) =>
      x.attributes.find(
        (y) => y.trait_type === trait && y.value === value.label
      )
    );
  }

  private _collection = broxieCollection;

  private get _ownedNfts(): BroxieNft[] {
    const totalNft = this.broxieStore.marketInfo.nftTotal;
    const startIndex = this.broxieStore.marketInfo.startIndex;

    return this.buyBroxieStore.currentBalance.ownedNfts.map((id) => {
      const shiftedIndex = getNftShiftedIndex(id, totalNft, startIndex) ?? id;

      return broxieCollection[shiftedIndex];
    });
  }
}
