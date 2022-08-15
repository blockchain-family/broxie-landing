import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BackgroundMusicProvider } from 'providers/BackgroundMusicProvider';
import { ProvideLayout } from 'providers/LayoutStoreProvider';
import { ProvideWallet } from 'providers/WalletProvider';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import ScrollToTop from './layout/scroll-to-top';
import LandingPage from 'modules/landing';

const App = () => {
  return (
    <ProvideWallet>
      <BackgroundMusicProvider>
        <BrowserRouter>
          <ProvideLayout>
            <ScrollToTop />

            <Navbar />

            <Routes>
              <Route index element={<LandingPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>

            <Footer />
          </ProvideLayout>
        </BrowserRouter>
      </BackgroundMusicProvider>
    </ProvideWallet>
  );
};

export default App;
