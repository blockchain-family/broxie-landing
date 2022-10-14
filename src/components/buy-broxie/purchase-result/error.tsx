import { useIntl } from 'react-intl';

import duskImg from 'assets/images/my-wallet/dusk.jpg';

const PurchaseError = () => {
  const intl = useIntl();

  return (
    <div className='flex flex-col items-center text-center space-y-6'>
      <img
        className='w-36 h-36 my-2 rounded-md'
        width={144}
        height={144}
        src={duskImg}
        alt=''
      />

      <div className='flex flex-col items-center text-center space-y-2'>
        <span className='font-bold'>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.purchase_result.failed',
            defaultMessage: 'Your purchase failed.',
          })}
        </span>

        <span>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.purchase_result.failed.error',
            defaultMessage:
              'An unexpected error occurred during the purchasing process. Please try again.',
          })}
        </span>
      </div>
    </div>
  );
};

export default PurchaseError;
