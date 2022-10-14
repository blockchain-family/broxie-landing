import SingleSelect from 'components/core/select/single-select';
import EvmPayment from './evm-payment';
import EverscalePayment from './everscale-payment';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useStaticData } from 'providers/StaticDataProvider';
import { useMemo } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import { PurchasePaymentState } from './PurchasePaymentState';
import { useBroxieStore } from 'providers/BroxieStoreProvider';

const PurchasePayment = observer(() => {
  const intl = useIntl();
  const staticData = useStaticData();
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();

  const state = useLocalObservable(
    () => new PurchasePaymentState(staticData, broxieStore, buyBroxieStore)
  );

  const currentNetwork = state.currentNetwork;

  const paymentComponent = useMemo(() => {
    if (!currentNetwork) {
      return null;
    }

    switch (currentNetwork.name) {
      case 'everscale':
        return <EverscalePayment state={state} />;
      default:
        return <EvmPayment state={state} />;
    }
  }, [currentNetwork, state]);

  return (
    <div className='flex flex-col text-secondaryBg/80 space-y-4'>
      <div className='flex'>
        <button
          className='flex space-x-1 items-center text-link'
          onClick={() => buyBroxieStore.resetPurchaseState()}
        >
          <BsChevronLeft />
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.buy_broxie.back',
              defaultMessage: 'Back',
            })}
          </span>
        </button>
      </div>

      <div className='flex flex-col space-y-1'>
        <span>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.payment.network',
            defaultMessage: 'Payment network:',
          })}
        </span>

        <SingleSelect
          placeholderText={intl.formatMessage({
            id: 'landing.navbar.buy_broxie.payment.network.placeholder',
            defaultMessage: 'Select network...',
          })}
          options={state.networkOptions}
          value={state.currentNetworkOption}
          onChange={(val) => state.setCurrentNetworkOption(val)}
          isSearchable={false}
        />
      </div>

      {paymentComponent}
    </div>
  );
});

export default PurchasePayment;
