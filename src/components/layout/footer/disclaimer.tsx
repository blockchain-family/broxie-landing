import { useIntl } from 'react-intl';
import Container from 'components/core/container';

const Disclaimer = () => {
  const intl = useIntl();

  return (
    <Container
      size='sm'
      className='flex flex-col space-y-4 sm:space-y-8 text-center px-6 pt-4 pb-8 sm:py-16'
    >
      <span className='font-header text-4xl sm:text-6xl'>
        {intl.formatMessage({
          id: 'landing.guarantee.title',
          defaultMessage: 'Guarantee',
        })}
      </span>

      <div className='flex flex-col space-y-4'>
        <span>
          {intl.formatMessage({
            id: 'landing.guarantee.description.part1',
            defaultMessage:
              'Hereby we confirm and guarantee that Finstream OÜ, a company duly incorporated and acting under the laws of the Republic of Estonia under the registration number 14770997, date of incorporation: July 29, 2019, having its registered address at: Harju maakond, Tallinn, Lasnamäe linnaosa, Katusepapi tn 4/2, 11412, Estonia, is the sole legal owner of NFT images showed below and has legally obtained all necessary copyrights for the said NFT images proposed to the investors herein.',
          })}
        </span>

        <span>
          {intl.formatMessage({
            id: 'landing.guarantee.description.part2',
            defaultMessage:
              'Finstream OÜ is legally allowed to alienate exclusive license to the said NFT images in full to any third person at its own discretion without any limitations.',
          })}
        </span>
      </div>
    </Container>
  );
};

export default Disclaimer;
