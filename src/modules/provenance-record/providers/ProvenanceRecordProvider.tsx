import { observer, useLocalObservable } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { createContext, useContext, useEffect } from 'react';
import { ProvenanceRecordStore } from '../stores/ProvenanceRecordStore';

const storeContext = createContext<ProvenanceRecordStore>(
  {} as ProvenanceRecordStore
);

export const ProvideProvenanceRecordStore = observer(({ children }: any) => {
  const broxieStore = useBroxieStore();
  const store = useLocalObservable(
    () => new ProvenanceRecordStore(broxieStore)
  );

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

export const useProvenanceRecordStore = () => {
  return useContext(storeContext);
};
