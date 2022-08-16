import { observer } from 'mobx-react-lite';
import { IntlProvider } from 'react-intl';

import messages_en from 'assets/lang/landing/en.json';

export const ProvideIntl = observer(({ children }: any) => {
  return (
    <IntlProvider defaultLocale={'en'} locale={'en'} messages={messages_en}>
      {children}
    </IntlProvider>
  );
});
