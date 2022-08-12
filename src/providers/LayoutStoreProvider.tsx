import ModalArea from 'components/layout/ModalArea';
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
    </storeContext.Provider>
  );
};

export const useLayoutStore = () => {
  return useContext(storeContext);
};
