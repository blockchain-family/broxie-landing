import { ReactComponent as MainBgSvg } from 'assets/images/landing/footer/social-buttons-bg.svg';
import { useIntl } from 'react-intl';

const links = [
  'https://twitter.com/BroxieNFT',
  'https://discord.gg/6dryaZQNmC',
  'https://t.me/broxieNFT_chat',
  'https://instagram.com/broxieNFT',
];

const SocialButtons = () => {
  const intl = useIntl();

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
            <a
              key={x}
              href={x}
              className='w-full h-full'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='w-full h-full' />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialButtons;
