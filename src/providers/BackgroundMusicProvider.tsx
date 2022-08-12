import { isMobile } from 'react-device-detect';
import { createContext, useContext, useEffect } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { BackgroundMusicStore } from 'stores/BackgroundMusicStore';

const storeContext = createContext<BackgroundMusicStore>(
  {} as BackgroundMusicStore
);

export const BackgroundMusicProvider = ({ children }: any) => {
  const store = useLocalObservable(() => new BackgroundMusicStore());

  useEffect(() => {
    if (isMobile) {
      return;
    }

    store.play();
  }, [store]);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useMusicStore = () => {
  return useContext(storeContext);
};
