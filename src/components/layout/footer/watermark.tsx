import { useIntl } from 'react-intl';
import { ReactComponent as BroxieSvg } from 'assets/images/broxie.svg';
import { useCallback, useMemo } from 'react';
import { useStaticData } from 'providers/StaticDataProvider';
import ExternalLink from 'components/core/external-link';

const Watermark = () => {
  const intl = useIntl();
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

      <span>
        © {currentYear}
        <ExternalLink href={staticData.urls.broxus} className='mx-1'>
          Broxus
        </ExternalLink>
      </span>
    </div>
  );
};

export default Watermark;
