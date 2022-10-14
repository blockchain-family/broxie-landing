import Modal from 'components/core/modal';
import { observer } from 'mobx-react-lite';
import { useIntl } from 'react-intl';
import { useLayoutStore } from 'providers/LayoutStoreProvider';
import { marketConfig } from 'config/market';
import { BsFileEarmarkText } from 'react-icons/bs';

const TermsOfService = observer(() => {
  const intl = useIntl();
  const layoutStore = useLayoutStore();

  return (
    <Modal
      size='lg'
      show={layoutStore.isTermsOfServiceVisible}
      onClose={() => layoutStore.hideTermsOfService()}
    >
      <div className='min-h-[90vh] w-full flex flex-col items-stretch text-black space-y-4'>
        <div className='flex items-center justify-center py-2 space-x-2'>
          <BsFileEarmarkText className='text-2xl' />
          <span className='text-lg'>
            {intl.formatMessage({
              id: 'landing.terms_of_service',
              defaultMessage: 'Terms of Service',
            })}
          </span>
        </div>

        <embed
          src={marketConfig.termsOfServiceUrl}
          className='flex-1 rounded-lg'
        />
      </div>
    </Modal>
  );
});

export default TermsOfService;
