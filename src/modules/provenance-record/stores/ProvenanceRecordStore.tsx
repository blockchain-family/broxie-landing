import { marketAbi } from 'abi/everscale/market';
import { provenanceConfig } from 'config/provenance';
import { makeAutoObservable, runInAction } from 'mobx';
import { BroxieStore } from 'stores/BroxieStore';
import { getNftShiftedIndex } from 'utils/market';

export class ProvenanceRecordStore {
  constructor(private broxieStore: BroxieStore) {
    makeAutoObservable(this);
  }

  private _initialized: boolean = false;
  private _startIndex: number | null = null;
  private _concatenatedHash: string = '';
  private _collection: {
    id: number;
    finalId: number | null;
    hash: string;
    url: string;
  }[] = [];

  async init() {
    const startIndex = await this.getStartIndex();

    const totalNft = provenanceConfig.imgHash.length;

    const collection = provenanceConfig.imgHash.map((hash, index) => ({
      id: index,
      finalId: getNftShiftedIndex(index, totalNft, startIndex),
      hash: hash,
      url: provenanceConfig.url[index],
    }));

    const concatenatedHash = ''.concat(...provenanceConfig.imgHash);

    runInAction(() => {
      this._startIndex = startIndex;
      this._collection = collection;
      this._concatenatedHash = concatenatedHash;
      this._initialized = true;
    });
  }

  get initialized() {
    return this._initialized;
  }

  get startIndex() {
    return this._startIndex;
  }

  get collection() {
    return this._collection;
  }

  get concatenatedHash() {
    return this._concatenatedHash;
  }

  get marketAddress() {
    return this.broxieStore.marketAddress.toString();
  }

  get collectionAddress() {
    return this.broxieStore.marketInfo.collectionAddress.toString();
  }

  get provenanceHash() {
    return provenanceConfig.provenanceHash;
  }

  get ipfsUrl() {
    return provenanceConfig.ipfsUrl;
  }

  private async getStartIndex() {
    if (!this.broxieStore.staticProvider) {
      return null;
    }

    try {
      const marketRootContract = new this.broxieStore.staticProvider.Contract(
        marketAbi,
        this.broxieStore.marketAddress
      );

      const { startIndex } = await marketRootContract.methods
        .startIndex()
        .call();

      if (!startIndex) {
        return null;
      }

      return Number(startIndex);
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
