import { observer } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { FormattedMessage } from 'react-intl';

const PurchaseFormBalance = observer(() => {
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();

  return (
    <div className='flex flex-col border border-black/10 rounded-xl px-4 py-2'>
      <span>
        <FormattedMessage
          id='landing.navbar.buy_broxie.broxies_remaining'
          defaultMessage='Broxies remaining: {remainingCount}'
          values={{
            remainingCount: (
              <span className='font-bold'>{broxieStore.availableNftCount}</span>
            ),
          }}
        />
      </span>

      <span>
        <FormattedMessage
          id='landing.navbar.buy_broxie.broxies_owned'
          defaultMessage='Owned: {ownedCount}'
          values={{
            ownedCount: (
              <span className='font-bold'>
                {`${buyBroxieStore.currentBalance.ownedNftsMarket.length} / ${broxieStore.marketInfo.nftPerHand}`}
              </span>
            ),
          }}
        />
      </span>

      {buyBroxieStore.currentBalance.discounts > 0 && (
        <span>
          <FormattedMessage
            id='landing.navbar.buy_broxie.available_discounts'
            defaultMessage='Available discount purchases: {discountCount}'
            values={{
              discountCount: (
                <span className='font-bold'>
                  {buyBroxieStore.currentBalance.discounts}
                </span>
              ),
            }}
          />
        </span>
      )}
    </div>
  );
});

export default PurchaseFormBalance;
