import Button from 'components/core/button';
import { PurchasePaymentState } from './PurchasePaymentState';
import { observer } from 'mobx-react-lite';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { FormattedMessage, useIntl } from 'react-intl';
import { ReactComponent as EverSvg } from 'assets/images/my-wallet/ever.svg';
import { bigNumberToStr } from 'utils/strings';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useLayoutStore } from 'providers/LayoutStoreProvider';

const EverscalePayment = observer(
  ({ state }: { state: PurchasePaymentState }) => {
    const intl = useIntl();
    const broxieStore = useBroxieStore();
    const layoutStore = useLayoutStore();
    const buyBroxieStore = useBuyBroxieStore();

    if (!buyBroxieStore.purchaseRequest) {
      return null;
    }

    return (
      <div className='flex flex-col space-y-4'>
        <div className='flex flex-col border border-black/10 rounded-xl'>
          <div className='p-4'>
            <span className='flex items-center justify-between'>
              <FormattedMessage
                id='landing.navbar.buy_broxie.payment.everscale.available_balance'
                defaultMessage='Available balance: {currentBalance}'
                values={{
                  currentBalance: (
                    <span className='flex items-center space-x-1'>
                      <EverSvg className='w-3 h-auto mr-1' />
                      <span>
                        {bigNumberToStr(buyBroxieStore.currentBalance.token, 2)}
                      </span>
                      <span>{broxieStore.paymentTokenSymbol}</span>
                    </span>
                  ),
                }}
              />
            </span>
          </div>

          <div className='flex flex-col border-t border-t-black/10 px-4 py-2'>
            <span className='flex items-center justify-between font-bold'>
              <FormattedMessage
                id='landing.navbar.buy_broxie.payment.everscale.amount_to_pay'
                defaultMessage='Total to pay: {totalValue}'
                values={{
                  totalValue: (
                    <span className='flex items-center space-x-1'>
                      <EverSvg className='w-3 h-auto mr-1' />
                      <span>
                        {bigNumberToStr(
                          buyBroxieStore.purchaseRequest.totalAmount,
                          2
                        )}
                      </span>
                      <span>{broxieStore.paymentTokenSymbol}</span>
                    </span>
                  ),
                }}
              />
            </span>
          </div>
        </div>

        <span className='text-sm text-center pt-2'>
          <FormattedMessage
            id='landing.terms_of_service.purchase'
            defaultMessage='By purchasing this item you automatically agree with our {termsOfService}.'
            values={{
              termsOfService: (
                <span
                  className='text-link underline cursor-pointer'
                  onClick={() => layoutStore.showTermsOfService()}
                >
                  {intl.formatMessage({
                    id: 'landing.terms_of_service',
                    defaultMessage: 'Terms of Service',
                  })}
                </span>
              ),
            }}
          />
        </span>

        <Button
          variant='primary'
          onClick={() => buyBroxieStore.buy(buyBroxieStore.purchaseRequest!)}
          disabled={state.everscaleBuyDisabled}
        >
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.pay_button',
            defaultMessage: 'Pay',
          })}
        </Button>
      </div>
    );
  }
);

export default EverscalePayment;
