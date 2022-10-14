import ExternalLink from 'components/core/external-link';
import { useStaticData } from 'providers/StaticDataProvider';
import { FormattedMessage, useIntl } from 'react-intl';

const NoEverWallet = () => {
  const intl = useIntl();
  const staticData = useStaticData();

  return (
    <div className='flex flex-col border border-black/10 rounded-xl text-center px-3 py-5 text-sm'>
      <span className='text-secondaryBg/80'>
        <FormattedMessage
          id='landing.navbar.my_wallet.no_ever_wallet'
          defaultMessage={
            'You need to connect {everWallet} to purchase Broxies'
          }
          values={{
            everWallet: (
              <ExternalLink href={staticData.urls.everWallet}>
                {intl.formatMessage({
                  id: 'landing.main.ever_wallet',
                  defaultMessage: 'EVER Wallet',
                })}
              </ExternalLink>
            ),
          }}
        />
      </span>
    </div>
  );
};

export default NoEverWallet;
