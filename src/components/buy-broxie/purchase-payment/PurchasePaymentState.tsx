import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { StaticDataStore } from 'stores/StaticDataStore';
import { SingleSelectValue } from 'components/core/select/single-select';
import { BuyBroxieStore } from 'stores/BuyBroxieStore';
import { BroxieStore } from 'stores/BroxieStore';

export class PurchasePaymentState {
  constructor(
    private staticData: StaticDataStore,
    private broxieStore: BroxieStore,
    private buyBroxieStore: BuyBroxieStore
  ) {
    makeAutoObservable(this);

    this.setCurrentNetworkOption(
      this.networkOptions.find((x) => x.value === 'everscale')
    );

    reaction(
      () => this.currentNetwork,
      () => {
        this.setCurrentTokenOption(undefined);
      }
    );

    reaction(
      () => this.currentCurrency,
      (currency) =>
        this.buyBroxieStore.setBridgePaymentCurrency(
          this.currentNetwork,
          currency
        )
    );
  }

  get networkCurrencies() {
    if (!this.currentNetwork) {
      return [];
    }

    return this.staticData.getNetworkCurrencies(this.currentNetwork);
  }

  get networkOptions(): SingleSelectValue[] {
    const networks = this.staticData.networks.map((x) => ({
      label: x.label,
      value: x.name,
      icon: x.logoUrl,
    }));

    if (!this.broxieStore.isMarketInEver) {
      return networks.filter((x) => x.value === 'everscale');
    }

    return networks;
  }

  get tokenOptions(): SingleSelectValue[] {
    if (!this.currentNetwork) {
      return [];
    }

    return this.networkCurrencies.map((x) => ({
      label: `${x.tip3Token.symbol} - ${x.tip3Token.name}`,
      value: x.tip3Token.symbol,
      icon: x.tip3Token.logoURI,
    }));
  }

  private _currentNetworkOption?: SingleSelectValue;
  private _currentTokenOption?: SingleSelectValue;

  get currentNetworkOption() {
    return this._currentNetworkOption;
  }

  get currentTokenOption() {
    return this._currentTokenOption;
  }

  get currentNetwork() {
    return this.staticData.networks.find(
      (x) => x.name === this._currentNetworkOption?.value
    );
  }

  get currentCurrency() {
    if (!this.currentTokenOption) {
      return undefined;
    }

    return this.networkCurrencies.find(
      (x) => x.tip3Token.symbol === this.currentTokenOption?.value
    );
  }

  get everscaleBuyDisabled() {
    if (!this.buyBroxieStore.canBuyMore) {
      return true;
    }

    if (
      this.buyBroxieStore.purchaseRequest?.totalAmount.isGreaterThan(
        this.buyBroxieStore.currentBalance.token
      )
    ) {
      return true;
    }

    return false;
  }

  get bridgeBuyDisabled() {
    if (!this.buyBroxieStore.canBuyMore) {
      return true;
    }

    const paymentData = this.buyBroxieStore.bridgePaymentData;

    if (!paymentData) {
      return true;
    }

    if (paymentData.erc20amount.isGreaterThan(paymentData.erc20balance)) {
      return true;
    }

    return false;
  }

  setCurrentNetworkOption(value: SingleSelectValue | null | undefined) {
    runInAction(() => {
      this._currentNetworkOption = value ?? undefined;
    });
  }

  setCurrentTokenOption(value: SingleSelectValue | null | undefined) {
    runInAction(() => {
      this._currentTokenOption = value ?? undefined;
    });
  }
}
