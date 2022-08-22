import { makeAutoObservable, runInAction } from 'mobx';

type ContentModalProps = {
  show: boolean;
  content: JSX.Element;
  size: 'sm' | 'md';
};

export class LayoutStore {
  constructor() {
    makeAutoObservable(this);
  }

  contentModal: ContentModalProps = {
    show: false,
    content: <></>,
    size: 'sm',
  };

  isMobileMenuVisible: boolean = false;

  showContentModal(content: JSX.Element, size: 'sm' | 'md') {
    runInAction(() => {
      this.contentModal = {
        show: true,
        content: content,
        size: size,
      };
    });

    document.body.classList.add('no-scroll');
  }

  hideContentModal() {
    runInAction(() => {
      this.contentModal = {
        show: false,
        content: <></>,
        size: 'sm',
      };
    });

    document.body.classList.remove('no-scroll');
  }

  showMobileMenu() {
    runInAction(() => {
      this.isMobileMenuVisible = true;
    });
  }

  hideMobileMenu() {
    runInAction(() => {
      this.isMobileMenuVisible = false;
    });
  }
}
