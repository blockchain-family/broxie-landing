import { observer } from 'mobx-react-lite';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useSmMediaQuery } from 'utils/responsiveness';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import WalletButton from './wallet-button';
import Button from 'components/core/button';
import { useIntl } from 'react-intl';
import { useCallback } from 'react';
import LanguageButton from './language-button';
import MusicButton from './music-button';

const MobileMenu = observer(() => {
  const intl = useIntl();
  const isDesktop = useSmMediaQuery();
  const layoutStore = useLayoutStore();

  const closeMobileMenu = useCallback(() => {
    layoutStore.hideMobileMenu();
  }, [layoutStore]);

  const goToElement = useCallback(
    (elementId: string) => {
      document
        .getElementById(elementId)
        ?.scrollIntoView({ behavior: 'smooth' });
      closeMobileMenu();
    },
    [closeMobileMenu]
  );

  if (isDesktop || !layoutStore.isMobileMenuVisible) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-background z-20'>
      <div className='flex flex-col justify-between h-full'>
        <div className='flex items-center justify-between px-4 pt-6'>
          <BroxieLogo className='w-20 h-auto' />

          <div className='flex items-center space-x-3'>
            <WalletButton />

            <Button
              variant='secondary'
              onClick={closeMobileMenu}
              className='!px-4'
            >
              {intl.formatMessage({
                id: 'landing.navbar.menu.close',
                defaultMessage: 'Close',
              })}
            </Button>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <Button
            variant='transparent'
            onClick={() => goToElement('utility_section')}
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.utility',
                defaultMessage: 'Utility',
              })}
            </span>
          </Button>

          <Button
            variant='transparent'
            onClick={() => goToElement('faq_section')}
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.faq',
                defaultMessage: 'FAQ',
              })}
            </span>
          </Button>
        </div>

        <div className='flex items-center justify-center space-x-2 py-2'>
          <LanguageButton />
          <MusicButton />
        </div>
      </div>
    </div>
  );
});

export default MobileMenu;
