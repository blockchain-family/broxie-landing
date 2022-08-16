import SocialButtons from './social-buttons';
import { useCallback, useMemo } from 'react';
import { ReactComponent as BroxieSvg } from 'assets/images/broxie.svg';
import { useIntl } from 'react-intl';

const Footer = () => {
  const intl = useIntl();

  const goUpClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className='flex flex-col mt-10 mb-4 sm:mb-10'>
      <SocialButtons />

      <div className='mx-auto flex flex-col space-y-5 text-center'>
        <BroxieSvg className='w-48 md:w-96 h-auto' />

        <span
          className='uppercase underline cursor-pointer'
          onClick={goUpClick}
        >
          {intl.formatMessage({
            id: 'landing.page_footer.return_to_top',
            defaultMessage: 'Return to top',
          })}
        </span>

        <span>
          © {currentYear}
          <a
            className='text-link mx-1'
            href='https://broxus.com'
            target='_blank'
            rel='noreferrer'
          >
            Broxus
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
