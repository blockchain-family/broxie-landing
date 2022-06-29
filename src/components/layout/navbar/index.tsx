import Button from 'components/core/button/button';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed z-10 top-4 lg:top-14 left-0 right-0 max-w-screen-xl mx-auto px-3 lg:px-8'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5'>
          <BroxieLogo className='w-24 lg:w-48' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center gap-2 sm:gap-4 lg:gap-8'>
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
