import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ReactComponent as UtilitySvg } from 'assets/images/landing/utility.svg';
import Container from 'components/core/container';

const UtilityButton = () => {
  const intl = useIntl();

  const utilities = useMemo(
    () => [
      {
        title: intl.formatMessage({
          id: 'landing.utility.item1',
          defaultMessage: 'FlatQube & Octus Bridge higher %s',
        }),
        description: intl.formatMessage({
          id: 'landing.utility.item1.description',
          defaultMessage:
            'Broxus is famous for its dApps: Octus Bridge and FlatQube. Unleash their full power with Broxie NFT ownership in the future. Who knows, maybe Broxie holders will get higher %s.',
        }),
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
    [intl]
  );

  return (
    <div id='utility_section' className='mx-auto max-w-3xl px-4 text-center'>
      <UtilitySvg className='w-full h-auto' />

      <Container
        size='sm'
        className='flex flex-col justify-center items-center text-lg space-y-8 sm:space-y-12 px-4'
      >
        <span>
          {intl.formatMessage({
            id: 'landing.utility.main',
            defaultMessage:
              "Each Broxie comes with utilities that will give you advantages and additional benefits when using Broxus products. There will be some killer utility mechanics implemented in the near future, don't miss your chance to profit!",
          })}
        </span>

        {utilities.map((x) => (
          <div className='flex flex-col space-y-1'>
            <span key={x.title} className='font-bold'>
              {x.title}
            </span>
            <span>{x.description}</span>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default UtilityButton;
