import Button from 'components/core/button';
import WalletButton from './wallet-button';
import LanguageButton from './language-button';
import MusicButton from './music-button';
import { observer } from 'mobx-react-lite';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useSmMediaQuery } from 'utils/responsiveness';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { useIntl } from 'react-intl';
import { useCallback } from 'react';
import { goToElement } from 'utils/layout';
import BroxieRoutes from 'routes';
import { Routes, Route, useNavigate } from 'react-router-dom';

const MobileMenu = observer(() => {
  const intl = useIntl();
  const navigate = useNavigate();
  const isDesktop = useSmMediaQuery();
  const layoutStore = useLayoutStore();

  const closeMobileMenu = useCallback(() => {
    layoutStore.hideMobileMenu();
  }, [layoutStore]);

  const onNavigate = useCallback(
    (url: string) => {
      closeMobileMenu();
      navigate(url);
    },
    [closeMobileMenu, navigate]
  );

  const onGoToElement = useCallback(
    (elementId: string) => {
      closeMobileMenu();
      goToElement(elementId);
    },
    [closeMobileMenu]
  );

  if (isDesktop || !layoutStore.isMobileMenuVisible) {
    return null;
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-background/90 z-20'>
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

        <div className='flex flex-col items-center space-y-3'>
          <Routes>
            <Route
              index
              element={
                <>
                  <Button
                    variant='transparent'
                    onClick={() =>
                      onGoToElement(BroxieRoutes.index.elements.utility)
                    }
                  >
                    <span className='text-2xl'>
                      {intl.formatMessage({
                        id: 'landing.navbar.utility',
                        defaultMessage: 'Utility',
                      })}
                    </span>
                  </Button>

                  <Button
                    variant='transparent'
                    onClick={() =>
                      onGoToElement(BroxieRoutes.index.elements.faq)
                    }
                  >
                    <span className='text-2xl'>
                      {intl.formatMessage({
                        id: 'landing.navbar.faq',
                        defaultMessage: 'FAQ',
                      })}
                    </span>
                  </Button>
                </>
              }
            />

            <Route
              path='*'
              element={
                <Button
                  variant='transparent'
                  onClick={() => onNavigate(BroxieRoutes.index.path)}
                >
                  <span className='text-2xl'>
                    {intl.formatMessage({
                      id: 'landing.navbar.home',
                      defaultMessage: 'Home',
                    })}
                  </span>
                </Button>
              }
            />
          </Routes>

          <Button
            variant='transparent'
            onClick={() => onNavigate(BroxieRoutes.gallery.path)}
          >
            <span className='text-2xl'>
              {intl.formatMessage({
                id: 'gallery.title',
                defaultMessage: 'Gallery',
              })}
            </span>
          </Button>
        </div>

        <div className='flex items-center justify-center space-x-2 pb-6'>
          <LanguageButton />
          <MusicButton />
        </div>
      </div>
    </div>
  );
});

export default MobileMenu;
