import BroxieRoutes from 'routes';

import Button from 'components/core/button';
import LanguageButton from './language-button';
import MusicButton from './music-button';
import WalletButton from './wallet-button';

import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { goToElement } from 'utils/layout';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { Route, Routes, Link } from 'react-router-dom';

const Navbar = () => {
  const layoutStore = useLayoutStore();

  const intl = useIntl();

  const openMobileMenu = useCallback(() => {
    layoutStore.showMobileMenu();
  }, [layoutStore]);

  return (
    <div className='fixed z-10 top-0 left-0 right-0 max-w-screen-xl mx-auto px-2 pt-4'>
      <div className='flex justify-between items-center sm:bg-background/25 rounded-2xl p-2 sm:p-3 lg:px-6'>
        <div className='flex space-x-5'>
          <BroxieLogo className='w-20 sm:w-28 lg:w-48 h-auto' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center space-x-3'>
          <div className='hidden sm:flex space-x-3'>
            <Routes>
              <Route
                index
                element={
                  <>
                    <Button
                      variant='transparent'
                      onClick={() =>
                        goToElement(BroxieRoutes.index.elements.utility)
                      }
                      className='!px-2'
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
                      onClick={() =>
                        goToElement(BroxieRoutes.index.elements.faq)
                      }
                      className='!px-4 sm:!px-6'
                    >
                      <span>
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
                path={BroxieRoutes.provenance_record.path}
                element={
                  <Link to={BroxieRoutes.index.path}>
                    <Button variant='transparent' className='!px-4 sm:!px-6'>
                      <span>
                        {intl.formatMessage({
                          id: 'landing.navbar.home',
                          defaultMessage: 'Home',
                        })}
                      </span>
                    </Button>
                  </Link>
                }
              />

              <Route path='*' element={<></>} />
            </Routes>
          </div>

          <WalletButton />

          <div className='hidden sm:flex space-x-3'>
            <LanguageButton />
            <MusicButton />
          </div>

          <div className='sm:hidden'>
            <Button
              variant='tertiary'
              onClick={openMobileMenu}
              className='!px-4'
            >
              {intl.formatMessage({
                id: 'landing.navbar.menu',
                defaultMessage: 'Menu',
              })}
            </Button>
          </div>
        </div>
      </div>

      <span className='font-primary hidden' />
      <span className='font-header hidden' />
    </div>
  );
};

export default Navbar;
