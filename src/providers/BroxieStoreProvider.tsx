import { observer, useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext, useEffect } from 'react';
import { BroxieStore } from 'stores/BroxieStore';

const storeContext = createContext<BroxieStore>({} as BroxieStore);

export const ProvideBroxieStore = observer(({ children }: any) => {
  const broxieStore = useLocalObservable(() => new BroxieStore());

  useEffect(() => {
    broxieStore.init();
  }, [broxieStore]);

  if (!broxieStore.initialized) {
    return null;
  }

  return (
    <storeContext.Provider value={broxieStore}>
      {children}
    </storeContext.Provider>
  );
});

export const useBroxieStore = () => {
  return useContext(storeContext);
};
