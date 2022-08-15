import SocialButtons from './social-buttons';
import { useCallback } from 'react';
import { ReactComponent as BroxieSvg } from 'assets/images/broxie.svg';

const Footer = () => {
  const goUpClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className='flex flex-col mt-10'>
      <SocialButtons />

      <div className='mx-auto flex flex-col space-y-5 text-center mb-10'>
        <BroxieSvg className='w-48 md:w-96 h-auto' />

        <span
          className='uppercase underline cursor-pointer'
          onClick={goUpClick}
        >
          Return to top
        </span>
      </div>
    </div>
  );
};

export default Footer;
