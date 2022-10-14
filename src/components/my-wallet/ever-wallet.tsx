import Button from 'components/core/button';
import ExternalLink from 'components/core/external-link';
import { ReactComponent as EverscaleSvg } from 'assets/images/networks/everscale.svg';
import { observer } from 'mobx-react-lite';
import { cutString } from 'utils/strings';
import { useIntl } from 'react-intl';
import { useStaticData } from 'providers/StaticDataProvider';
import { useEverWallet } from 'providers/EverWalletProvider';

const EverWallet = observer(({ className }: { className?: string }) => {
  const intl = useIntl();
  const staticData = useStaticData();
  const everWallet = useEverWallet();

  return (
    <div className={`flex items-center justify-between p-3 ${className}`}>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-3'>
          <EverscaleSvg className='w-8 sm:w-12 h-auto' />

          <div className='flex flex-col'>
            <ExternalLink href={staticData.urls.everWallet}>
              <span className='sm:text-lg'>
                {intl.formatMessage({
                  id: 'landing.main.ever_wallet',
                  defaultMessage: 'EVER Wallet',
                })}
              </span>
            </ExternalLink>

            {everWallet.extensionInstalled ? (
              <span className='text-sm text-secondaryBg/80'>
                {everWallet.account
                  ? cutString(everWallet.account.address.toString(), 8, 4)
                  : intl.formatMessage({
                      id: 'landing.navbar.my_wallet.not_connected',
                      defaultMessage: 'Not connected',
                    })}
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
          size='sm'
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
        <Button variant='primary' size='sm'>
          <ExternalLink href={staticData.urls.everWallet}>
            <span className='text-primary'>
              {intl.formatMessage({
                id: 'landing.navbar.my_wallet.install',
                defaultMessage: 'Install',
              })}
            </span>
          </ExternalLink>
        </Button>
      )}
    </div>
  );
});

export default EverWallet;
