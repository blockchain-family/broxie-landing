import Button from 'components/core/button/button';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='fixed z-10 top-4 sm:top-8 lg:top-14 left-0 right-0 max-w-screen-xl mx-auto px-3 sm:px-5 lg:px-8'>
      <div className='flex justify-between items-center'>
        <div className='flex space-x-5'>
          <BroxieLogo className='w-20 sm:w-28 lg:w-48 h-auto' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center space-x-4 sm:space-x-8'>
          <NavLink to='/'>Home</NavLink>
          <span className='cursor-pointer'>FAQ</span>
          {/* <NavLink to='/gallery'>
            Gallery
          </NavLink> */}

          <Button variant='primary'>My Wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
