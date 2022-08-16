import Button from 'components/core/button/button';
import { ReactComponent as UserSvg } from 'assets/images/user.svg';
import { ReactComponent as EverscaleSvg } from 'assets/images/everscale.svg';
import { ReactComponent as MetamaskSvg } from 'assets/images/metamask.svg';
import { observer } from 'mobx-react-lite';
import { cutString } from 'utils/strings';
import { useEverWallet, useMetamaskWallet } from 'providers/WalletProvider';
import { useIntl } from 'react-intl';

const EverWallet = observer(({ className }: { className?: string }) => {
  const everWallet = useEverWallet();
  const intl = useIntl();

  return (
    <div className={`flex items-center justify-between p-3 ${className}`}>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-3'>
          <EverscaleSvg className='w-8 sm:w-12 h-auto' />

          <div className='flex flex-col'>
            <a
              className='text-link sm:text-lg'
              href={everWallet.extensionDownloadUrl}
              target='_blank'
              rel='noreferrer'
            >
              <span>EVER Wallet</span>
            </a>

            {everWallet.extensionInstalled ? (
              <span className='text-sm text-secondaryBg/80'>
                {everWallet.account
                  ? cutString(everWallet.account.address, 8, 4)
                  : 'Not connected'}
              </span>
            ) : (
              <span className='text-sm text-secondaryBg/80'>
                {intl.formatMessage({
                  id: 'landing.navbar.my_wallet.not_installed',
                  defaultMessage: 'Not installed',
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {everWallet.extensionInstalled ? (
        <Button
          variant='primary'
          className='!px-4 !py-2'
          onClick={() => {
            everWallet.account ? everWallet.logout() : everWallet.login();
          }}
        >
          <span className='text-primary'>
            {everWallet.account
              ? intl.formatMessage({
                  id: 'landing.navbar.my_wallet.disconnect',
                  defaultMessage: 'Disconnect',
                })
              : intl.formatMessage({
                  id: 'landing.navbar.my_wallet.connect',
                  defaultMessage: 'Connect',
                })}
          </span>
        </Button>
      ) : (
        <Button variant='primary' className='!px-4 !py-2'>
          <a
            className='text-primary'
            href={everWallet.extensionDownloadUrl}
            target='_blank'
            rel='noreferrer'
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.my_wallet.install',
                defaultMessage: 'Install',
              })}
            </span>
          </a>
        </Button>
      )}
    </div>
  );
});

const MetamaskWallet = observer(({ className }: { className?: string }) => {
  const metamaskWallet = useMetamaskWallet();
  const intl = useIntl();

  return (
    <div className={`flex items-center justify-between p-3 ${className}`}>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-3'>
          <MetamaskSvg className='w-8 sm:w-12 h-auto' />

          <div className='flex flex-col'>
            <a
              className='text-link sm:text-lg'
              href={metamaskWallet.extensionDownloadUrl}
              target='_blank'
              rel='noreferrer'
            >
              <span>MetaMask</span>
            </a>

            {metamaskWallet.extensionInstalled ? (
              <span className='text-sm text-secondaryBg/80'>
                {metamaskWallet.account
                  ? cutString(metamaskWallet.account, 8, 4)
                  : 'Not connected'}
              </span>
            ) : (
              <span className='text-sm text-secondaryBg/80'>
                {intl.formatMessage({
                  id: 'landing.navbar.my_wallet.not_installed',
                  defaultMessage: 'Not installed',
                })}
              </span>
            )}
          </div>
        </div>
      </div>

      {metamaskWallet.extensionInstalled && !metamaskWallet.account && (
        <Button
          variant='primary'
          className='!px-4 !py-2'
          onClick={() => metamaskWallet.login()}
        >
          <span className='text-primary'>
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.connect',
              defaultMessage: 'Connect',
            })}
          </span>
        </Button>
      )}

      {!metamaskWallet.extensionInstalled && (
        <Button variant='primary' className='!px-4 !py-2'>
          <a
            className='text-primary'
            href={metamaskWallet.extensionDownloadUrl}
            target='_blank'
            rel='noreferrer'
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.my_wallet.install',
                defaultMessage: 'Install',
              })}
            </span>
          </a>
        </Button>
      )}
    </div>
  );
});

const MyWallet = ({ onClose }: { onClose: () => void }) => {
  const intl = useIntl();

  return (
    <div className='flex flex-col text-black'>
      <div className='flex items-center justify-center pt-2 pb-4 space-x-4 border-b-black/10'>
        <UserSvg className='w-10 h-auto' />
        <span className='text-lg'>
          {intl.formatMessage({
            id: 'landing.navbar.my_wallet',
            defaultMessage: 'My Wallet',
          })}
        </span>
      </div>

      <div className='flex flex-col border border-black/10 mt-2 mb-8 rounded-xl'>
        <EverWallet className='border-b border-b-black/10' />
        <MetamaskWallet />
      </div>

      <Button variant='primary' onClick={onClose}>
        <span className='text-primary'>
          {intl.formatMessage({
            id: 'landing.navbar.my_wallet.close',
            defaultMessage: 'Close',
          })}
        </span>
      </Button>
    </div>
  );
};

export default MyWallet;
