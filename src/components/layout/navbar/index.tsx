import Button from 'components/core/button/button';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Broxie } from 'assets/images/broxie.svg';
import { ReactComponent as BroxieLogo } from 'assets/images/broxie-logo.svg';

const Navbar = () => {
  return (
    <div className='fixed z-10 top-0 left-0 right-0 max-w-screen-xl mx-auto px-2 pt-4'>
      <div className='flex justify-between items-center bg-background/25 rounded-2xl p-2 sm:p-3 lg:px-6'>
        <div className='flex space-x-5'>
          <BroxieLogo className='w-20 sm:w-28 lg:w-48 h-auto' />
          <Broxie className='hidden lg:block' />
        </div>

        <div className='flex items-center space-x-4 sm:space-x-8'>
          <NavLink to='/'>Home</NavLink>

          <span className='cursor-pointer'>FAQ</span>

          <Button variant='primary'>My Wallet</Button>
        </div>
      </div>

      <span className='font-primary hidden' />
      <span className='font-header hidden' />
    </div>
  );
};

export default Navbar;
