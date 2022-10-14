import { useIntl } from 'react-intl';
import { observer } from 'mobx-react-lite';
import { PurchaseState } from 'stores/BuyBroxieStore';
import { BiLoaderAlt } from 'react-icons/bi';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';

const PurchaseProgress = observer(() => {
  const intl = useIntl();
  const buyBroxieStore = useBuyBroxieStore();

  return (
    <div className='flex flex-col text-secondaryBg/80 p-4'>
      <div className='flex flex-col items-center justify-center space-y-8 text-center'>
        <BiLoaderAlt className='icon-spin text-7xl text-primaryBg/80' />

        {buyBroxieStore.purchaseState ===
          PurchaseState.WaitingForConfirmation && (
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.buy_broxie.progress.waiting_for_confirmation',
              defaultMessage:
                'Your purchase requires confirmation. Please confirm the transaction in your wallet.',
            })}
          </span>
        )}

        {buyBroxieStore.purchaseState ===
          PurchaseState.WaitingForTransaction && (
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.buy_broxie.progress.waiting_for_transaction',
              defaultMessage:
                'Your purchase is being processed. It may take a few minutes...',
            })}
          </span>
        )}
      </div>
    </div>
  );
});

export default PurchaseProgress;
