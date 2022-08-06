import Button from 'components/core/button/button';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed z-10 top-4 sm:top-8 lg:top-14 left-0 right-0 max-w-screen-xl mx-auto px-3 sm:px-5 lg:px-8'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <BroxieLogo className='min-w-[5rem] sm:min-w-[7rem] lg:min-w-[12rem]' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center gap-4 sm:gap-8'>
          <NavLink to='/' className='no-underline'>
            Home
          </NavLink>
          <NavLink to='/gallery' className='no-underline'>
            Gallery
          </NavLink>

          <Button variant='primary'>My Wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
