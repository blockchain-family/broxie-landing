import { useIntl } from 'react-intl';

import movieImg from 'assets/images/my-wallet/movie.jpg';

const PurchaseCancelled = () => {
  const intl = useIntl();

  return (
    <div className='flex flex-col items-center text-center space-y-6'>
      <img
        className='w-36 h-36 my-2 rounded-md'
        width={144}
        height={144}
        src={movieImg}
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
            id: 'landing.navbar.buy_broxie.purchase_result.failed.cancelled',
            defaultMessage:
              'The purchase transaction was canceled by the user.',
          })}
        </span>
      </div>
    </div>
  );
};

export default PurchaseCancelled;
