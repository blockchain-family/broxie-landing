import { createContext, useContext, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { EverWalletStore } from 'stores/EverWalletStore';
import { MetaMaskStore } from 'stores/MetaMaskStore';

const everWalletContext = createContext({} as EverWalletStore);
const metaMaskContext = createContext({} as MetaMaskStore);

export const ProvideWallet = observer(({ children }: any) => {
  const everStore = useLocalObservable(() => new EverWalletStore());
  const metamaskStore = useLocalObservable(() => new MetaMaskStore());

  useEffect(() => {
    everStore.init();
    metamaskStore.init();
  }, [everStore, metamaskStore]);

  return (
    <everWalletContext.Provider value={everStore}>
      <metaMaskContext.Provider value={metamaskStore}>
        {children}
      </metaMaskContext.Provider>
    </everWalletContext.Provider>
  );
});

export const useEverWallet = () => {
  return useContext(everWalletContext);
};

export const useMetamaskWallet = () => {
  return useContext(metaMaskContext);
};
