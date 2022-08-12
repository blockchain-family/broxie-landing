import { createContext, useContext, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { WalletStore } from 'stores/WalletStore';

const storeContext = createContext({} as WalletStore);

export const ProvideWallet = observer(({ children }: any) => {
  const store = useLocalObservable(() => new WalletStore());

  useEffect(() => {
    store.init();
  }, [store]);

  if (!store.initialized) {
    return null;
  }

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
});

export const useWalletStore = () => {
  return useContext(storeContext);
};
