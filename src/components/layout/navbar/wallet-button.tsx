import Button from 'components/core/button';
import { useIntl } from 'react-intl';
import { useLayoutStore } from 'providers/LayoutStoreProvider';

const WalletButton = () => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();

  return (
    <Button variant='primary' onClick={() => layoutStore.showMyWallet()}>
      {intl.formatMessage({
        id: 'landing.navbar.my_wallet',
        defaultMessage: 'My Wallet',
      })}
    </Button>
  );
};

export default WalletButton;
