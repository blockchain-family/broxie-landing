import { BuyBroxieStore } from 'stores/BuyBroxieStore';
import { makeAutoObservable, runInAction } from 'mobx';
import { BroxieStore } from 'stores/BroxieStore';
import BigNumber from 'bignumber.js';

export class PurchaseFormState {
  constructor(
    private broxieStore: BroxieStore,
    private buyBroxieStore: BuyBroxieStore
  ) {
    makeAutoObservable(this);
  }

  get nftsToBuy() {
    return this._nftsToBuy;
  }

  get minAllowed() {
    return 1;
  }

  get prices() {
    let result = [];

    const discountPrice = {
      price: this.broxieStore.marketInfo.discountPrice,
      count: this.nftsToBuyWithDiscount,
      total: this.broxieStore.marketInfo.discountPrice.multipliedBy(
        this.nftsToBuyWithDiscount
      ),
    };

    result.push(discountPrice);

    for (let i = 1; i <= this.nftsToBuyRegularPrice; i++) {
      const price = this.broxieStore.getPrice(i);

      const existing = result.find((x) => x.price.isEqualTo(price));

      if (existing) {
        existing.total = existing.price.multipliedBy(++existing.count);
        continue;
      }

      const newEntry = { price: price, count: 1, total: price };
      result.push(newEntry);
    }

    return result;
  }

  get maxAllowed() {
    return this.buyBroxieStore.canBuyNftCount;
  }

  get nextPrice() {
    if (this.buyBroxieStore.currentBalance.discounts - this.nftsToBuy > 0) {
      return this.broxieStore.marketInfo.discountPrice;
    }

    return this.broxieStore.getPrice(this.nftsToBuyRegularPrice + 1);
  }

  get nftsToBuyWithDiscount() {
    return Math.min(
      this.nftsToBuy,
      this.buyBroxieStore.currentBalance.discounts
    );
  }

  get nftsToBuyRegularPrice() {
    return this.nftsToBuy - this.nftsToBuyWithDiscount;
  }

  get totalPrice() {
    return this.prices
      .map((x) => x.total)
      .reduce((x, y) => x.plus(y), new BigNumber(0));
  }

  get paymentDisabled() {
    if (!this.buyBroxieStore.canBuyMore) {
      return true;
    }

    return false;
  }

  get buyDisabled() {
    if (!this.buyBroxieStore.canBuyMore) {
      return true;
    }

    if (
      this.totalPrice.isGreaterThan(this.buyBroxieStore.currentBalance.token)
    ) {
      return true;
    }

    return false;
  }

  private _nftsToBuy: number = 1;

  changeNftsToBuy(val: number) {
    if (val <= 0) {
      val = this.minAllowed;
    }

    if (val > this.maxAllowed) {
      val = this.maxAllowed;
    }

    runInAction(() => {
      this._nftsToBuy = val;
    });
  }
}
