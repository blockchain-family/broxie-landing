import { createContext, useContext, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useBroxieStore } from './BroxieStoreProvider';
import { EverWalletStore } from 'stores/EverWalletStore';

const storeContext = createContext({} as EverWalletStore);

export const ProvideEverWallet = observer(({ children }: any) => {
  const broxieStore = useBroxieStore();
  const everStore = useLocalObservable(() => new EverWalletStore(broxieStore));

  useEffect(() => {
    everStore.init();
  }, [everStore]);

  return (
    <storeContext.Provider value={everStore}>{children}</storeContext.Provider>
  );
});

export const useEverWallet = () => {
  return useContext(storeContext);
};
