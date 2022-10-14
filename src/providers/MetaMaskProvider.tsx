import { createContext, useContext, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { MetaMaskStore } from 'stores/MetaMaskStore';

const storeContext = createContext({} as MetaMaskStore);

export const ProvideMetaMask = observer(({ children }: any) => {
  const metaMaskStore = useLocalObservable(() => new MetaMaskStore());

  useEffect(() => {
    metaMaskStore.init();
  }, [metaMaskStore]);

  return (
    <storeContext.Provider value={metaMaskStore}>
      {children}
    </storeContext.Provider>
  );
});

export const useMetaMask = () => {
  return useContext(storeContext);
};
