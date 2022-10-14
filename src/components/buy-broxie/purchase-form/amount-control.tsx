import Button from 'components/core/button';
import { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { BsDash, BsPlus } from 'react-icons/bs';
import { FormattedMessage } from 'react-intl';
import { bigNumberToStr } from 'utils/strings';
import { PurchaseFormState } from './PurchaseFormState';
import { ReactComponent as EverSvg } from 'assets/images/my-wallet/ever.svg';

const PurchaseFormAmountControl = observer(
  ({ state }: { state: PurchaseFormState }) => {
    const broxieStore = useBroxieStore();

    const pricesTotal = useMemo(
      () => state.prices.filter((x) => x.count > 0),
      [state.prices]
    );

    return (
      <div className='flex flex-col border border-black/10 rounded-xl'>
        <div className='flex flex-col space-y-4 p-4'>
          <div className='flex items-center justify-center font-bold space-x-1'>
            <EverSvg className='w-5 h-auto mr-1' />
            <span>{bigNumberToStr(state.nextPrice, 2)}</span>
            <span>{broxieStore.paymentTokenSymbol}</span>
          </div>

          <div className='flex justify-center items-center'>
            <Button
              variant='primary'
              className='!px-2'
              size='sm'
              onClick={() => state.changeNftsToBuy(state.nftsToBuy - 1)}
              disabled={state.nftsToBuy <= state.minAllowed}
            >
              <BsDash className='text-3xl' />
            </Button>

            <span className='font-bold text-center text-3xl min-w-[5rem]'>
              {state.nftsToBuy}
            </span>

            <Button
              variant='primary'
              className='!px-2'
              size='sm'
              onClick={() => state.changeNftsToBuy(state.nftsToBuy + 1)}
              disabled={state.nftsToBuy >= state.maxAllowed}
            >
              <BsPlus className='text-3xl' />
            </Button>
          </div>
        </div>

        {pricesTotal.length > 0 && (
          <div className='flex flex-col border-t border-t-black/10 px-4 py-2'>
            {pricesTotal.map((x, i) => (
              <span key={i} className='flex items-center justify-between'>
                <span className='flex items-center space-x-1 sm:space-x-3'>
                  <span className='font-bold'>{`${x.count}x`}</span>
                  <span>{`${bigNumberToStr(x.price, 2)} ${
                    broxieStore.paymentTokenSymbol
                  }`}</span>
                </span>
                <span className='flex items-center space-x-1'>
                  <EverSvg className='w-3 h-auto mr-1' />
                  <span>{bigNumberToStr(x.total, 2)}</span>
                  <span>{broxieStore.paymentTokenSymbol}</span>
                </span>
              </span>
            ))}
          </div>
        )}

        <div className='flex flex-col border-t border-t-black/10 px-4 py-2'>
          <span className='flex items-center justify-between font-bold'>
            <FormattedMessage
              id='landing.navbar.buy_broxie.total'
              defaultMessage='Total: {totalValue}'
              values={{
                totalValue: (
                  <span className='flex items-center space-x-1'>
                    <EverSvg className='w-3 h-auto mr-1' />
                    <span>{bigNumberToStr(state.totalPrice, 2)}</span>
                    <span>{broxieStore.paymentTokenSymbol}</span>
                  </span>
                ),
              }}
            />
          </span>
        </div>
      </div>
    );
  }
);

export default PurchaseFormAmountControl;
