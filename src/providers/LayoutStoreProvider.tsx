import ModalArea from 'components/layout/modal-area';
import MobileMenu from 'components/layout/navbar/mobile-menu';
import TermsOfService from 'components/layout/terms-of-service';
import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { LayoutStore } from 'stores/LayoutStore';

const storeContext = createContext<LayoutStore>({} as LayoutStore);

export const ProvideLayout = ({ children }: any) => {
  const store = useLocalObservable(() => new LayoutStore());

  return (
    <storeContext.Provider value={store}>
      {children}

      <ModalArea />
      <MobileMenu />
      <TermsOfService />
    </storeContext.Provider>
  );
};

export const useLayoutStore = () => {
  return useContext(storeContext);
};
