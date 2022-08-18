import { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as UtilitySvg } from 'assets/images/landing/utility.svg';
import { useStaticData } from 'providers/StaticDataProvider';
import Container from 'components/core/container';
import ExternalLink from 'components/core/external-link';

const Utility = () => {
  const intl = useIntl();
  const staticData = useStaticData();

  const utilities = useMemo(
    () => [
      {
        title: intl.formatMessage({
          id: 'landing.utility.item1',
          defaultMessage: 'FlatQube & Octus Bridge higher %s',
        }),
        description: (
          <FormattedMessage
            id='landing.utility.item1.description'
            defaultMessage={
              'Broxus is famous for its dApps: {octusBridge} and {flatQube}. Unleash their full power with Broxie NFT ownership in the future. Who knows, maybe Broxie holders will get higher %s.'
            }
            values={{
              octusBridge: (
                <ExternalLink href={staticData.urls.octusBridge}>
                  Octus Bridge
                </ExternalLink>
              ),
              flatQube: (
                <ExternalLink href={staticData.urls.flatQube}>
                  FlatQube
                </ExternalLink>
              ),
            }}
          />
        ),
      },
      {
        title: intl.formatMessage({
          id: 'landing.utility.item2',
          defaultMessage: 'VIP community access',
        }),
        description: intl.formatMessage({
          id: 'landing.utility.item2.description',
          defaultMessage:
            'Yep, sounds vulgar, but it is what it is! You will be invited to a secret space of initial Everscale investors, where you can participate and express your opinion. Moreover, there will be special rooms for you during future conferences and hackathons.',
        }),
      },
      {
        title: intl.formatMessage({
          id: 'landing.utility.item3',
          defaultMessage: 'Join the Everscale GameFi future',
        }),
        description: intl.formatMessage({
          id: 'landing.utility.item3.description',
          defaultMessage:
            'More games (and dApps) are coming to Everscale. With a Broxie NFT you will be granted special features in many of them. How about a cool Broxie avatar? Or maybe something that will give you a leg up on all your enemies?',
        }),
      },
    ],
    [intl, staticData.urls]
  );

  return (
    <div id='utility_section' className='mx-auto max-w-3xl px-4 text-center'>
      <UtilitySvg className='w-full h-auto mb-4' />

      <Container
        size='sm'
        className='flex flex-col justify-center items-center text-lg px-4 space-y-8'
      >
        <span>
          {intl.formatMessage({
            id: 'landing.utility.main',
            defaultMessage:
              "Each Broxie comes with utilities that will give you advantages and additional benefits when using Broxus products. There will be some killer utility mechanics implemented in the near future, don't miss your chance to profit!",
          })}
        </span>

        {utilities.map((x) => (
          <div key={x.title} className='flex flex-col space-y-1'>
            <span className='font-bold text-xl sm:text-2xl'>{x.title}</span>
            <span>{x.description}</span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Utility;
