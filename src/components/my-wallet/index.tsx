import Button from 'components/core/button';
import NoEverWallet from './no-ever-wallet';
import SaleState from './sale-state';
import AccountState from './account-state';
import EverWallet from './ever-wallet';
import MetamaskWallet from './metamask-wallet';
import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { ReactComponent as UserSvg } from 'assets/images/my-wallet/user.svg';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useEffect, useMemo } from 'react';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useEverWallet } from 'providers/EverWalletProvider';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { MarketState } from 'stores/BroxieStore';

const MyWallet = observer(({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();
  const layoutStore = useLayoutStore();
  const everWallet = useEverWallet();

  const buyButtonDisabled = useMemo(
    () =>
      !everWallet.extensionInstalled ||
      !everWallet.account ||
      !buyBroxieStore.isCorrectNetwork,
    [
      buyBroxieStore.isCorrectNetwork,
      everWallet.account,
      everWallet.extensionInstalled,
    ]
  );

  useEffect(() => {
    buyBroxieStore.refresh();
  }, [buyBroxieStore]);

  return (
    <div className='flex flex-col text-black space-y-4'>
      <div className='flex items-center justify-center py-2 space-x-4'>
        <UserSvg className='w-10 h-auto' />
        <span className='text-lg'>
          {intl.formatMessage({
            id: 'landing.navbar.my_wallet',
            defaultMessage: 'My Wallet',
          })}
        </span>
      </div>

      <div className='flex flex-col border border-black/10 rounded-xl'>
        <EverWallet className='border-b border-b-black/10' />
        <MetamaskWallet />
      </div>

      <div className='flex flex-col space-y-4'>
        <SaleState />

        {(!everWallet.extensionInstalled || !everWallet.account) && (
          <NoEverWallet />
        )}

        {everWallet.account && <AccountState />}

        {broxieStore.marketState === MarketState.Active && (
          <Button
            variant='primary'
            onClick={() => layoutStore.showBuyBroxie()}
            disabled={buyButtonDisabled}
          >
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.buy_broxie',
              defaultMessage: 'Buy Broxie',
            })}
          </Button>
        )}
      </div>
    </div>
  );
});

export default MyWallet;
