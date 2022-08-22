import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BackgroundMusicProvider } from 'providers/BackgroundMusicProvider';
import { ProvideIntl } from 'providers/IntlProvider';
import { ProvideLayout } from 'providers/LayoutStoreProvider';
import { ProvideWallet } from 'providers/WalletProvider';
import { ProvideStaticData } from 'providers/StaticDataProvider';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import ScrollToTop from './layout/scroll-to-top';
import LandingPage from 'modules/landing';

const Providers = ({ children }: { children: any }) => {
  return (
    <ProvideStaticData>
      <ProvideIntl>
        <ProvideWallet>
          <BackgroundMusicProvider>
            <BrowserRouter>
              <ProvideLayout>{children}</ProvideLayout>
            </BrowserRouter>
          </BackgroundMusicProvider>
        </ProvideWallet>
      </ProvideIntl>
    </ProvideStaticData>
  );
};

const App = () => {
  return (
    <Providers>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Footer />
    </Providers>
  );
};

export default App;
