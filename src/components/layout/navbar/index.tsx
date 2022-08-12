import Button from 'components/core/button/button';
import { NavLink } from 'react-router-dom';
import { BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { useMusicStore } from 'providers/BackgroundMusicProvider';
import { Observer } from 'mobx-react-lite';

const Navbar = () => {
  const musicStore = useMusicStore();

  return (
    <div className='fixed z-10 top-0 left-0 right-0 max-w-screen-xl mx-auto px-2 pt-4'>
      <div className='flex justify-between items-center bg-background/25 rounded-2xl p-2 sm:p-3 lg:px-6'>
        <div className='flex space-x-5'>
          <BroxieLogo className='w-20 sm:w-28 lg:w-48 h-auto' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center space-x-1 sm:space-x-3'>
          <NavLink to='/' className='sm:px-2'>
            Home
          </NavLink>

          <span className='cursor-pointer px-4 sm:px-6'>FAQ</span>

          <Button variant='primary'>My Wallet</Button>

          <Observer>
            {() => (
              <div
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
              </div>
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
