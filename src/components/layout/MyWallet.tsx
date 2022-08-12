import { ReactComponent as UserSvg } from 'assets/images/user.svg';
import { ReactComponent as EverscaleSvg } from 'assets/images/everscale.svg';
import Button from 'components/core/button/button';
import { observer } from 'mobx-react-lite';
import { useWalletStore } from 'providers/WalletStoreProvider';
import React from 'react';
import { cutString } from 'utils/strings';

const MyWallet = observer(() => {
  const walletStore = useWalletStore();

  return (
    <div className='flex flex-col text-black'>
      <div className='flex items-center justify-center pt-2 pb-4 space-x-4 border-b border-b-black/20'>
        <UserSvg className='w-10 h-auto' />
        <span className='text-lg'>My Wallet</span>
      </div>

      {walletStore.loggedIn && walletStore.account?.address ? (
        <div className='flex flex-col items-center space-y-1 pt-4'>
          <span>Your address</span>
          <span className='text-link'>
            {cutString(walletStore.account?.address, 10, 4)}
          </span>
        </div>
      ) : (
        <React.Fragment>
          <div className='flex items-center justify-center space-x-1 pt-4'>
            <span>Connect with</span>
            <a
              className='text-link'
              href={walletStore.extensionDownloadUrl}
              target='_blank'
              rel='noreferrer'
            >
              <span>EVER Wallet</span>
            </a>
          </div>
        </React.Fragment>
      )}

      <div className='flex justify-center py-6'>
        <EverscaleSvg className='w-full h-auto max-w-[160px] sm:max-w-[200px]' />
      </div>

      {walletStore.loggedIn && (
        <Button variant='primary' onClick={() => walletStore.logout()}>
          <span className='text-primary'>Disconnect</span>
        </Button>
      )}

      {walletStore.extensionInstalled && !walletStore.loggedIn && (
        <Button variant='primary' onClick={() => walletStore.login()}>
          <span className='text-primary'>Connect</span>
        </Button>
      )}

      {!walletStore.extensionInstalled && (
        <a
          href={walletStore.extensionDownloadUrl}
          target='_blank'
          rel='noreferrer'
        >
          <Button variant='primary' className='w-full'>
            <span className='text-primary'>Get EVER Wallet</span>
          </Button>
        </a>
      )}
    </div>
  );
});

export default MyWallet;
