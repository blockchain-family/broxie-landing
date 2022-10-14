import PurchaseForm from './purchase-form';
import PurchaseProgress from './purchase-progress';
import PurchaseResult from './purchase-result';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { PurchaseState } from 'stores/BuyBroxieStore';
import PurchasePayment from './purchase-payment';

const BuyBroxie = observer(({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();
  const buyBroxieStore = useBuyBroxieStore();

  useEffect(() => {
    buyBroxieStore.refresh();
  }, [buyBroxieStore]);

  const purchaseStateComponent = useMemo(() => {
    switch (buyBroxieStore.purchaseState) {
      case PurchaseState.Start:
        return <PurchaseForm />;
      case PurchaseState.Payment:
        return <PurchasePayment />;
      case PurchaseState.WaitingForConfirmation:
      case PurchaseState.WaitingForTransaction:
        return <PurchaseProgress />;
      default:
        return <PurchaseResult />;
    }
  }, [buyBroxieStore.purchaseState]);

  return (
    <div className='flex flex-col text-black space-y-4'>
      <div className='flex items-center justify-center py-2'>
        <span className='text-lg'>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.title',
            defaultMessage: 'Broxie Purchase',
          })}
        </span>
      </div>

      {purchaseStateComponent}
    </div>
  );
});

export default BuyBroxie;
