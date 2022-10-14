import Button from 'components/core/button';
import ExternalLink from 'components/core/external-link';
import { useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { ReactComponent as MetamaskSvg } from 'assets/images/my-wallet/metamask.svg';
import { observer } from 'mobx-react-lite';
import { cutString } from 'utils/strings';
import { useIntl } from 'react-intl';
import { useStaticData } from 'providers/StaticDataProvider';
import { useMetaMask } from 'providers/MetaMaskProvider';

const MetamaskWallet = observer(({ className }: { className?: string }) => {
  const intl = useIntl();
  const staticData = useStaticData();
  const metaMask = useMetaMask();

  const isSupported = useMemo(() => {
    if (isMobile) {
      return false;
    }

    return true;
  }, []);

  const statusText = useMemo(() => {
    if (!isSupported) {
      return intl.formatMessage({
        id: 'landing.navbar.my_wallet.not_supported',
        defaultMessage: 'Not supported on mobile',
      });
    }

    if (!metaMask.extensionInstalled) {
      return intl.formatMessage({
        id: 'landing.navbar.my_wallet.not_installed',
        defaultMessage: 'Not installed',
      });
    }

    if (!metaMask.account) {
      return intl.formatMessage({
        id: 'landing.navbar.my_wallet.not_connected',
        defaultMessage: 'Not connected',
      });
    }

    return cutString(metaMask.account, 8, 4);
  }, [intl, isSupported, metaMask.account, metaMask.extensionInstalled]);

  return (
    <div className={`flex items-center justify-between p-3 ${className}`}>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-3'>
          <MetamaskSvg className='w-8 sm:w-12 h-auto' />

          <div className='flex flex-col'>
            <ExternalLink href={staticData.urls.metaMask}>
              <span className='sm:text-lg'>
                {intl.formatMessage({
                  id: 'landing.main.metamask',
                  defaultMessage: 'MetaMask',
                })}
              </span>
            </ExternalLink>

            <span className='text-sm text-secondaryBg/80'>{statusText}</span>
          </div>
        </div>
      </div>

      {metaMask.extensionInstalled && !metaMask.account && (
        <Button variant='primary' size='sm' onClick={() => metaMask.login()}>
          <span className='text-primary'>
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet.connect',
              defaultMessage: 'Connect',
            })}
          </span>
        </Button>
      )}

      {!metaMask.extensionInstalled && isSupported && (
        <Button variant='primary' size='sm'>
          <ExternalLink href={staticData.urls.metaMask}>
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

export default MetamaskWallet;
