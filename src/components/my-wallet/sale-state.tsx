import { observer } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { MarketState } from 'stores/BroxieStore';
import { dateToStr } from 'utils/strings';

const SaleState = observer(() => {
  const intl = useIntl();
  const broxieStore = useBroxieStore();

  const marketStateToText = useMemo(() => {
    switch (broxieStore.marketState) {
      case MarketState.Upcoming:
        return intl.formatMessage({
          id: 'landing.navbar.my_wallet.sale.upcoming',
          defaultMessage: 'Upcoming',
        });
      case MarketState.Active:
        return intl.formatMessage({
          id: 'landing.navbar.my_wallet.sale.active',
          defaultMessage: 'Active',
        });
      case MarketState.SoldOut:
      case MarketState.Completed:
        return intl.formatMessage({
          id: 'landing.navbar.my_wallet.sale.finished',
          defaultMessage: 'Finished',
        });
    }
  }, [broxieStore.marketState, intl]);

  return (
    <div className='flex flex-col p-3 border border-black/10 rounded-xl text-secondaryBg/80 text-sm'>
      <div className='flex space-x-1'>
        <span>
          {intl.formatMessage({
            id: 'landing.navbar.my_wallet.sale.state',
            defaultMessage: 'Sale state:',
          })}
        </span>
        <span className='font-bold'>{marketStateToText}</span>
      </div>

      {broxieStore.marketState === MarketState.Active && (
        <>
          <div className='flex space-x-1'>
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.my_wallet.sale.broxies_remaining',
                defaultMessage: 'Broxies remaining:',
              })}
            </span>
            <span className='font-bold'>{broxieStore.availableNftCount}</span>
          </div>

          <div className='flex space-x-1'>
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.my_wallet.sale.end_date',
                defaultMessage: 'Sale end date:',
              })}
            </span>
            <span className='font-bold'>
              {dateToStr(broxieStore.marketInfo.revealDate, 'dd.MM.yyyy HH:mm')}
            </span>
          </div>
        </>
      )}

      {broxieStore.marketState === MarketState.Upcoming && (
        <div className='flex space-x-1'>
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.sale.start_date',
              defaultMessage: 'Sale start date:',
            })}
          </span>
          <span className='font-bold'>
            {dateToStr(broxieStore.marketInfo.startDate, 'dd.MM.yyyy HH:mm')}
          </span>
        </div>
      )}

      {broxieStore.marketState > MarketState.Active && (
        <div className='flex space-x-1'>
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.sale.broxies_sold',
              defaultMessage: 'Total Broxies sold:',
            })}
          </span>
          <span className='font-bold'>{broxieStore.totalNftSold}</span>
        </div>
      )}
    </div>
  );
});

export default SaleState;
