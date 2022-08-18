import { useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext } from 'react';
import { StaticDataStore } from 'stores/StaticDataStore';

const storeContext = createContext<StaticDataStore>({} as StaticDataStore);

export const ProvideStaticData = ({ children }: any) => {
  const store = useLocalObservable(() => new StaticDataStore());

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStaticData = () => {
  return useContext(storeContext);
};
