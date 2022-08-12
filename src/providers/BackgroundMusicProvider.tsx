import { createContext, useContext } from 'react';
import { useLocalObservable } from 'mobx-react-lite';
import { BackgroundMusicStore } from 'stores/BackgroundMusicStore';

const storeContext = createContext<BackgroundMusicStore>(
  {} as BackgroundMusicStore
);

export const BackgroundMusicProvider = ({ children }: any) => {
  const store = useLocalObservable(() => new BackgroundMusicStore());

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useMusicStore = () => {
  return useContext(storeContext);
};
