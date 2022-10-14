import Button from 'components/core/button';
import SingleSelect from 'components/core/select/single-select';
import { observer } from 'mobx-react-lite';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { useMetaMask } from 'providers/MetaMaskProvider';
import { FormattedMessage, useIntl } from 'react-intl';
import { Network } from 'stores/StaticDataStore';
import { bigNumberToStr } from 'utils/strings';
import { PurchasePaymentState } from './PurchasePaymentState';

const NoExtension = () => {
  return (
    <div className='border border-black/10 rounded-xl p-4 text-center text-sm'>
      <FormattedMessage
        id='landing.navbar.buy_broxie.payment.evm.no_extension'
        defaultMessage='MetaMask wallet is not connected.'
      />
    </div>
  );
};

const IncorrectNetwork = ({ expected }: { expected?: Network }) => {
  const metaMask = useMetaMask();

  if (!expected) {
    return null;
  }

  return (
    <div className='flex flex-col items-center space-y-3 border border-black/10 rounded-xl p-4 text-center text-sm'>
      <span className='flex flex-col space-y-1'>
        <FormattedMessage
          id='landing.navbar.buy_broxie.payment.evm.incorrect_network'
          defaultMessage='Incorrect network selected in MetaMask.'
        />

        <span>
          <FormattedMessage
            id='landing.navbar.buy_broxie.payment.evm.incorrect_network.please_select'
            defaultMessage='Please select {blockChain} network in your wallet.'
            values={{
              blockChain: <span className='font-bold'>{expected?.label}</span>,
            }}
          />
        </span>
      </span>

      <Button
        variant='primary'
        className='max-w-xs'
        size='sm'
        onClick={() => metaMask.switchNetwork(expected)}
      >
        <FormattedMessage
          id='landing.navbar.buy_broxie.payment.evm.incorrect_network.please_select.switch'
          defaultMessage='Switch Network'
        />
      </Button>
    </div>
  );
};

const EvmPayment = observer(({ state }: { state: PurchasePaymentState }) => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();
  const metaMask = useMetaMask();
  const buyBroxieStore = useBuyBroxieStore();

  if (!metaMask.extensionInstalled || !metaMask.account) {
    return <NoExtension />;
  }

  if (state.currentNetwork?.chainId !== metaMask.networkId?.toString()) {
    return <IncorrectNetwork expected={state.currentNetwork} />;
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='flex flex-col space-y-1'>
        <span>
          {intl.formatMessage({
            id: 'landing.navbar.buy_broxie.payment.evm.token',
            defaultMessage: 'Token:',
          })}
        </span>

        <SingleSelect
          placeholderText={intl.formatMessage({
            id: 'landing.navbar.buy_broxie.payment.evm.token.placeholder',
            defaultMessage: 'Select token...',
          })}
          options={state.tokenOptions}
          value={state.currentTokenOption}
          onChange={(val) => state.setCurrentTokenOption(val)}
          isSearchable={false}
        />
      </div>

      {buyBroxieStore.bridgePaymentData ? (
        <div className='flex flex-col border border-black/10 rounded-xl'>
          <div className='flex flex-col p-4'>
            <span className='flex items-center justify-between'>
              <FormattedMessage
                id='landing.navbar.buy_broxie.payment.everscale.available_balance'
                defaultMessage='Available balance: {currentBalance}'
                values={{
                  currentBalance: (
                    <span className='flex items-center space-x-1'>
                      <span>
                        {bigNumberToStr(
                          buyBroxieStore.bridgePaymentData.erc20balance,
                          8
                        )}
                      </span>
                      <span>
                        {buyBroxieStore.bridgePaymentData.erc20token.symbol}
                      </span>
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
                      <span>
                        {bigNumberToStr(
                          buyBroxieStore.bridgePaymentData.erc20amount,
                          8
                        )}
                      </span>
                      <span>
                        {buyBroxieStore.bridgePaymentData.erc20token.symbol}
                      </span>
                    </span>
                  ),
                }}
              />
            </span>
          </div>
        </div>
      ) : (
        <div className='min-h-[99px]' />
      )}

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
        disabled={state.bridgeBuyDisabled}
      >
        {intl.formatMessage({
          id: 'landing.navbar.buy_broxie.pay_button',
          defaultMessage: 'Pay',
        })}
      </Button>
    </div>
  );
});

export default EvmPayment;
