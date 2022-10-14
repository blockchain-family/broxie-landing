import BuyBroxie from 'components/buy-broxie';
import MyWallet from 'components/my-wallet';
import { makeAutoObservable, runInAction } from 'mobx';

type ContentModalProps = {
  show: boolean;
  content: JSX.Element;
  size: 'sm' | 'md' | 'lg';
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
  isTermsOfServiceVisible: boolean = false;

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

  showTermsOfService() {
    runInAction(() => {
      this.isTermsOfServiceVisible = true;
    });

    document.body.classList.add('no-scroll');
  }

  hideTermsOfService() {
    runInAction(() => {
      this.isTermsOfServiceVisible = false;
    });

    if (!this.contentModal.show) {
      document.body.classList.remove('no-scroll');
    }
  }

  showMyWallet() {
    this.showContentModal(
      <MyWallet onClose={() => this.hideContentModal()} />,
      'md'
    );
  }

  showBuyBroxie() {
    this.showContentModal(
      <BuyBroxie onClose={() => this.hideContentModal()} />,
      'md'
    );
  }
}
