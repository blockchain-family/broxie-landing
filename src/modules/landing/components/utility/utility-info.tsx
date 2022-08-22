import { useMemo } from 'react';
import { useStaticData } from 'providers/StaticDataProvider';
import { ReactComponent as MainUtilitySvg } from 'assets/images/landing/utility/utility.svg';
import { ReactComponent as JoinEverscaleSvg } from 'assets/images/landing/utility/join-everscale.svg';
import { ReactComponent as FlatqubeSvg } from 'assets/images/landing/utility/flatqube.svg';
import { ReactComponent as VipSvg } from 'assets/images/landing/utility/vip.svg';
import { ReactComponent as UtilityPlateSvg } from 'assets/images/landing/utility/utility-plate.svg';
import { FormattedMessage, useIntl } from 'react-intl';
import ExternalLink from 'components/core/external-link';

const UtilityInfo = ({
  type,
  className,
}: {
  type: 'main' | 'join_everscale' | 'flatqube' | 'vip';
  className?: string;
}) => {
  const intl = useIntl();
  const staticData = useStaticData();

  const svg = useMemo(() => {
    const svgClass = 'w-full h-auto';

    switch (type) {
      case 'main':
        return <MainUtilitySvg className={svgClass} />;

      case 'flatqube':
        return <FlatqubeSvg className={svgClass} />;

      case 'vip':
        return <VipSvg className={svgClass} />;

      case 'join_everscale':
        return <JoinEverscaleSvg className={svgClass} />;
    }
  }, [type]);

  const text = useMemo(() => {
    switch (type) {
      case 'main':
        return intl.formatMessage({
          id: 'landing.utility.main',
          defaultMessage:
            "Each Broxie comes with utilities that will give you advantages and additional benefits when using Broxus products. There will be some killer utility mechanics implemented in the near future, don't miss your chance to profit!",
        });

      case 'flatqube':
        return (
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
        );

      case 'vip':
        return intl.formatMessage({
          id: 'landing.utility.item2.description',
          defaultMessage:
            'Yep, sounds vulgar, but it is what it is! You will be invited to a secret space of initial Everscale investors, where you can participate and express your opinion. Moreover, there will be special rooms for you during future conferences and hackathons.',
        });

      case 'join_everscale':
        return intl.formatMessage({
          id: 'landing.utility.item3.description',
          defaultMessage:
            'More games (and dApps) are coming to Everscale. With a Broxie NFT you will be granted special features in many of them. How about a cool Broxie avatar? Or maybe something that will give you a leg up on all your enemies?',
        });
    }
  }, [intl, staticData.urls, type]);

  return (
    <div className={className ?? ''}>
      {svg}

      <div className='relative px-[22%] pt-[15%] sm:pt-[12%] pb-[10%] sm:pb-[6%] -mt-[18%]'>
        <UtilityPlateSvg className='absolute w-[80%] h-full mx-auto top-0 bottom-0 left-0 right-0 -z-10' />

        <div className='text-center'>{text}</div>
      </div>
    </div>
  );
};

export default UtilityInfo;
