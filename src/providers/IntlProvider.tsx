import { observer, useLocalObservable } from 'mobx-react-lite';
import { createContext, useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { LanguageStore } from 'stores/LanguageStore';

const storeContext = createContext<LanguageStore>({} as LanguageStore);

export const ProvideIntl = observer(({ children }: any) => {
  const store = useLocalObservable(() => new LanguageStore());

  useEffect(() => {
    store.init();
  }, [store]);

  if (!store.initialized) {
    return null;
  }

  return (
    <storeContext.Provider value={store}>
      <IntlProvider
        defaultLocale={store.language.id}
        locale={store.language.id}
        messages={store.messages}
      >
        {children}
      </IntlProvider>
    </storeContext.Provider>
  );
});

export const useLanguageStore = () => {
  return useContext(storeContext);
};
