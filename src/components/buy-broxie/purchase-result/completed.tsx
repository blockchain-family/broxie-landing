import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { PurchaseResult } from 'stores/BuyBroxieStore';

import poolImg from 'assets/images/my-wallet/pool.jpg';
import dawnImg from 'assets/images/my-wallet/dawn.jpg';

const PurchaseCompleted = ({ result }: { result?: PurchaseResult }) => {
  const intl = useIntl();

  const purchaseResultText = useMemo(() => {
    if (!result) {
      return null;
    }

    if (!result.success) {
      return intl.formatMessage({
        id: 'landing.navbar.buy_broxie.purchase_result.failed',
        defaultMessage: 'Your purchase failed.',
      });
    }

    if (result.expectedNfts !== result.nftPurchased) {
      return intl.formatMessage({
        id: 'landing.navbar.buy_broxie.purchase_result.successful_partially',
        defaultMessage: 'Your purchase was partially successful.',
      });
    }

    return intl.formatMessage({
      id: 'landing.navbar.buy_broxie.purchase_result.successful',
      defaultMessage: 'Your purchase was successful.',
    });
  }, [intl, result]);

  const purchaseResultDescriptionText = useMemo(() => {
    if (!result) {
      return null;
    }

    if (!result.success) {
      return intl.formatMessage({
        id: 'landing.navbar.buy_broxie.purchase_result.failed.price_changed',
        defaultMessage:
          'The sent token amount was not enough to complete the purchase due to a price change. Tokens will be returned to your address.',
      });
    }

    if (result.expectedNfts !== result.nftPurchased) {
      return intl.formatMessage(
        {
          id: 'landing.navbar.buy_broxie.purchase_result.successful_partially.description',
          defaultMessage:
            'You will receive {purchasedCount} Broxie NFT out of {expectedCount} due to a price change or all of the Broxies being out of stock.',
        },
        {
          purchasedCount: result.nftPurchased,
          expectedCount: result.expectedNfts,
        }
      );
    }

    return intl.formatMessage(
      {
        id: 'landing.navbar.buy_broxie.purchase_result.successful.description',
        defaultMessage: 'You will receive {purchasedCount} Broxie NFT.',
      },
      {
        purchasedCount: result.nftPurchased,
      }
    );
  }, [intl, result]);

  if (!result) {
    return null;
  }

  return (
    <div className='flex flex-col items-center text-center space-y-6'>
      <img
        className='w-36 h-36 my-2 rounded-md'
        width={144}
        height={144}
        src={result.success ? poolImg : dawnImg}
        alt=''
      />

      <div className='flex flex-col items-center text-center space-y-2'>
        <span className='font-bold'>{purchaseResultText}</span>
        <span>{purchaseResultDescriptionText}</span>
      </div>
    </div>
  );
};

export default PurchaseCompleted;
