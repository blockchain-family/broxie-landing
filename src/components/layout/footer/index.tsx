import SocialButtons from './social-buttons';
import Disclaimer from './disclaimer';
import Watermark from './watermark';

const Footer = () => {
  return (
    <div className='flex flex-col mt-10 mb-4 sm:mb-10'>
      <SocialButtons />
      <Disclaimer />
      <Watermark />
    </div>
  );
};

export default Footer;
