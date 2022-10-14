import Button from 'components/core/button';
import PurchaseFormBalance from './balance';
import PurchaseFormAmountControl from './amount-control';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useIntl } from 'react-intl';
import { BsChevronLeft } from 'react-icons/bs';
import { PurchaseFormState } from './PurchaseFormState';
import { useBroxieStore } from 'providers/BroxieStoreProvider';

const PurchaseForm = observer(() => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();

  const state = useLocalObservable(
    () => new PurchaseFormState(broxieStore, buyBroxieStore)
  );

  return (
    <div className='flex flex-col text-secondaryBg/80 space-y-4'>
      <div className='flex'>
        <button
          className='flex space-x-1 items-center text-link'
          onClick={() => layoutStore.showMyWallet()}
        >
          <BsChevronLeft />
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.buy_broxie.back_to_wallet',
              defaultMessage: 'Back to My Wallet',
            })}
          </span>
        </button>
      </div>

      <PurchaseFormBalance />
      <PurchaseFormAmountControl state={state} />

      <Button
        variant='primary'
        onClick={() =>
          buyBroxieStore.moveToPaymentState({
            totalAmount: state.totalPrice,
            expectedRegularPriceNfts: state.nftsToBuyRegularPrice,
            expectedDiscountPriceNfts: state.nftsToBuyWithDiscount,
          })
        }
        disabled={state.paymentDisabled}
      >
        {intl.formatMessage({
          id: 'landing.navbar.buy_broxie.pay_button',
          defaultMessage: 'Pay',
        })}
      </Button>
    </div>
  );
});

export default PurchaseForm;
