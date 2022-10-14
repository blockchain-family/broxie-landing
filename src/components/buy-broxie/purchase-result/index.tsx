import Button from 'components/core/button';
import { observer } from 'mobx-react-lite';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { PurchaseState } from 'stores/BuyBroxieStore';

import PurchaseError from './error';
import PurchaseCancelled from './cancelled';
import PurchaseCompleted from './completed';

const PurchaseResult = observer(() => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();
  const buyBroxieStore = useBuyBroxieStore();

  const backToWallet = useCallback(async () => {
    await buyBroxieStore.resetPurchaseState();

    layoutStore.showMyWallet();
  }, [buyBroxieStore, layoutStore]);

  return (
    <div className='flex flex-col text-secondaryBg/80 space-y-12'>
      {buyBroxieStore.purchaseState === PurchaseState.Cancelled && (
        <PurchaseCancelled />
      )}

      {buyBroxieStore.purchaseState === PurchaseState.Error && (
        <PurchaseError />
      )}

      {buyBroxieStore.purchaseState === PurchaseState.Completed && (
        <PurchaseCompleted result={buyBroxieStore.purchaseResult} />
      )}

      <div className='flex'>
        <Button variant='primary' onClick={backToWallet} className='w-full'>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.back_to_wallet',
            defaultMessage: 'Back to My Wallet',
          })}
        </Button>
      </div>
    </div>
  );
});

export default PurchaseResult;
