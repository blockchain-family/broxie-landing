import { ReactComponent as MainBgSvg } from 'assets/images/landing/footer/social-buttons-bg.svg';
import { useStaticData } from 'providers/StaticDataProvider';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import ExternalLink from 'components/core/external-link';

const SocialButtons = () => {
  const staticData = useStaticData();
  const intl = useIntl();

  const links = useMemo(
    () => [
      staticData.urls.broxie.twitter,
      staticData.urls.broxie.discord,
      staticData.urls.broxie.telegram,
      staticData.urls.broxie.instagram,
    ],
    [staticData.urls]
  );

  return (
    <div className='flex flex-col w-full max-w-6xl mx-auto text-center'>
      <span className='text-4xl sm:text-6xl font-header'>
        {intl.formatMessage({
          id: 'landing.page_footer.social_buttons.title',
          defaultMessage: 'Check us out on social media',
        })}
      </span>

      <div className='relative'>
        <MainBgSvg className='w-full h-auto' />

        <div className='absolute top-[28%] bottom-[24%] left-[10%] right-[10%] flex justify-around items-center'>
          {links.map((x) => (
            <ExternalLink key={x} className='w-full h-full' href={x}>
              <div className='w-full h-full' />
            </ExternalLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialButtons;
