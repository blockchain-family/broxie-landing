import { useBroxieStore } from './BroxieStoreProvider';
import { BuyBroxieStore } from 'stores/BuyBroxieStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { useEverWallet } from './EverWalletProvider';
import { useMetaMask } from './MetaMaskProvider';

const storeContext = createContext<BuyBroxieStore>({} as BuyBroxieStore);

export const ProvideBuyBroxieStore = observer(({ children }: any) => {
  const everWallet = useEverWallet();
  const metaMask = useMetaMask();
  const broxieStore = useBroxieStore();

  const store = useLocalObservable(
    () => new BuyBroxieStore(everWallet, metaMask, broxieStore)
  );

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
});

export const useBuyBroxieStore = () => {
  return useContext(storeContext);
};
