import Button from 'components/core/button';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import MyWallet from '../my-wallet';

const WalletButton = () => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();

  const openWallet = useCallback(() => {
    layoutStore.showContentModal(
      <MyWallet onClose={() => layoutStore.hideContentModal()} />,
      'md'
    );
  }, [layoutStore]);

  return (
    <Button variant='primary' onClick={openWallet}>
      {intl.formatMessage({
        id: 'landing.navbar.my_wallet',
        defaultMessage: 'My Wallet',
      })}
    </Button>
  );
};

export default WalletButton;
