import './index.css';
import { useMemo } from 'react';
import { ReactComponent as CloseSvg } from 'assets/images/close.svg';

type ModalProps = {
  size: 'sm' | 'md';
  show: boolean;
  onClose?: () => void;
  children?: JSX.Element | JSX.Element[] | string;
};

const Modal = ({ size, show, children, onClose }: ModalProps) => {
  const modalClass = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'min-w-[95vw] max-w-[95vw] sm:min-w-[320px] sm:max-w-[320px]';
      case 'md':
        return 'min-w-[95vw] max-w-[95vw] sm:min-w-[540px] sm:max-w-[540px]';
    }
  }, [size]);

  if (!show) {
    return null;
  }

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'>
      <div className='absolute top-0 left-0 right-0 bottom-0 -z-10 modal_overlay_background' />
      <div
        className={`${modalClass} relative modal_background shadow-primary rounded-2xl py-3`}
      >
        <div className='absolute top-4 right-0 flex items-center justify-end px-4'>
          <CloseSvg className='cursor-pointer' onClick={() => onClose?.()} />
        </div>
        <div className='px-5 pt-1 pb-2'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
