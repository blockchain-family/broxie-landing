import { observer, useLocalObservable } from 'mobx-react-lite';
import { useBroxieStore } from 'providers/BroxieStoreProvider';
import { useBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { createContext, useContext } from 'react';
import { GalleryStore } from '../stores/GalleryStore';

const storeContext = createContext<GalleryStore>({} as GalleryStore);

export const ProvideGalleryStore = observer(({ children }: any) => {
  const broxieStore = useBroxieStore();
  const buyBroxieStore = useBuyBroxieStore();
  const store = useLocalObservable(
    () => new GalleryStore(broxieStore, buyBroxieStore)
  );

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
});

export const useGalleryStore = () => {
  return useContext(storeContext);
};
