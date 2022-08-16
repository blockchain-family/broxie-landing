import MyWallet from '../my-wallet';
import Button from 'components/core/button/button';
import { useCallback } from 'react';
import { BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { useMusicStore } from 'providers/BackgroundMusicProvider';
import { Observer } from 'mobx-react-lite';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useIntl } from 'react-intl';

const Navbar = () => {
  const musicStore = useMusicStore();
  const layoutStore = useLayoutStore();

  const intl = useIntl();

  const goToElement = useCallback((elementId: string) => {
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className='fixed z-10 top-0 left-0 right-0 max-w-screen-xl mx-auto px-2 pt-4'>
      <div className='flex justify-between items-center bg-background/25 rounded-2xl p-2 sm:p-3 lg:px-6'>
        <div className='flex space-x-5'>
          <BroxieLogo className='w-20 sm:w-28 lg:w-48 h-auto' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center space-x-1 sm:space-x-3'>
          <button
            className='px-2'
            onClick={() => goToElement('utility_section')}
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.utility',
                defaultMessage: 'Utility',
              })}
            </span>
          </button>

          <button
            className='px-4 sm:px-6'
            onClick={() => goToElement('faq_section')}
          >
            <span>
              {intl.formatMessage({
                id: 'landing.navbar.faq',
                defaultMessage: 'FAQ',
              })}
            </span>
          </button>

          <Button
            variant='primary'
            onClick={() =>
              layoutStore.showContentModal(
                <MyWallet onClose={() => layoutStore.hideContentModal()} />,
                'md'
              )
            }
          >
            {intl.formatMessage({
              id: 'landing.navbar.my_wallet',
              defaultMessage: 'My Wallet',
            })}
          </Button>

          <Observer>
            {() => (
              <button
                className='hidden sm:block bg-primary/20 rounded-full p-3 cursor-pointer'
                onClick={() => {
                  musicStore.playing === true
                    ? musicStore.pause()
                    : musicStore.play();
                }}
              >
                <span className='text-3xl'>
                  {musicStore.playing ? <BsVolumeUp /> : <BsVolumeMute />}
                </span>
              </button>
            )}
          </Observer>
        </div>
      </div>

      <span className='font-primary hidden' />
      <span className='font-header hidden' />
    </div>
  );
};

export default Navbar;
