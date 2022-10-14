import { useIntl } from 'react-intl';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { ReactComponent as BroxieSvg } from 'assets/images/broxie.svg';
import { useCallback, useMemo } from 'react';
import { useStaticData } from 'providers/StaticDataProvider';
import ExternalLink from 'components/core/external-link';

const Watermark = () => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();
  const staticData = useStaticData();

  const goUpClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className='mx-auto flex flex-col space-y-5 text-center'>
      <BroxieSvg className='w-48 md:w-96 h-auto' />

      <span className='uppercase underline cursor-pointer' onClick={goUpClick}>
        {intl.formatMessage({
          id: 'landing.page_footer.return_to_top',
          defaultMessage: 'Return to top',
        })}
      </span>

      <span className='flex flex-col space-y-1'>
        <span
          className='text-link underline text-sm cursor-pointer'
          onClick={() => layoutStore.showTermsOfService()}
        >
          {intl.formatMessage({
            id: 'landing.terms_of_service',
            defaultMessage: 'Terms of Service',
          })}
        </span>
        <span>
          © {currentYear}
          <ExternalLink href={staticData.urls.broxus} className='mx-1'>
            {intl.formatMessage({
              id: 'landing.main.broxus',
              defaultMessage: 'Broxus',
            })}
          </ExternalLink>
        </span>
      </span>
    </div>
  );
};

export default Watermark;
