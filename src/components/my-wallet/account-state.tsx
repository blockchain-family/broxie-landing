import broxie from 'assets/images/my-wallet/broxie.png';
import ExternalLink from 'components/core/external-link';
import { observer } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useStaticData } from 'providers/StaticDataProvider';
import { FormattedMessage, useIntl } from 'react-intl';

const AccountState = observer(() => {
  const intl = useIntl();
  const staticData = useStaticData();
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();

  if (!buyBroxieStore.isCorrectNetwork) {
    return (
      <div className='flex flex-col p-3 border border-black/10 rounded-xl text-secondaryBg/80 text-sm'>
        <div className='flex flex-col text-center'>
          <span>
            <FormattedMessage
              id='landing.navbar.my_wallet.unsupported_network_selected'
              defaultMessage='Unsupported network selected in {everWallet}.'
              values={{
                everWallet: (
                  <ExternalLink href={staticData.urls.everWallet}>
                    {intl.formatMessage({
                      id: 'landing.main.ever_wallet',
                      defaultMessage: 'EVER Wallet',
                    })}
                  </ExternalLink>
                ),
              }}
            />
          </span>

          <span>
            <FormattedMessage
              id='landing.navbar.my_wallet.unsupported_network_selected.expected'
              defaultMessage='Please select {networkName} network.'
              values={{
                networkName: (
                  <span className='font-bold'>{broxieStore.networkName}</span>
                ),
              }}
            />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col p-3 border border-black/10 rounded-xl text-secondaryBg/80 text-sm'>
      <div className='flex items-center justify-between'>
        <span className='flex items-center space-x-2'>
          <span>
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.broxies_owned',
              defaultMessage: 'Broxies owned:',
            })}
          </span>
          <span className='flex items-center space-x-1'>
            <span className='font-bold text-xl'>
              {buyBroxieStore.currentBalance.ownedNfts.length}
            </span>

            <img
              className='w-7 h-auto'
              src={broxie}
              width={28}
              height={28}
              alt=''
            />
          </span>
        </span>
      </div>
    </div>
  );
});

export default AccountState;
