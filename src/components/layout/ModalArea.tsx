import Modal from 'components/core/modal';
import { observer } from 'mobx-react-lite';
import { useLayoutStore } from 'providers/LayoutStoreProvider';

const ModalArea = observer(() => {
  const layoutStore = useLayoutStore();

  return (
    <Modal
      size={layoutStore.contentModal.size}
      show={layoutStore.contentModal.show}
      onClose={() => layoutStore.hideContentModal()}
    >
      {layoutStore.contentModal.content}
    </Modal>
  );
});

export default ModalArea;
