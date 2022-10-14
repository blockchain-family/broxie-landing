import React, { Suspense } from 'react';
import BroxieRoutes from 'routes';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import ScrollToTop from './layout/scroll-to-top';
import LandingPage from 'modules/landing';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BackgroundMusicProvider } from 'providers/BackgroundMusicProvider';
import { ProvideIntl } from 'providers/IntlProvider';
import { ProvideLayout } from 'providers/LayoutStoreProvider';
import { ProvideStaticData } from 'providers/StaticDataProvider';
import { ProvideBroxieStore } from 'providers/BroxieStoreProvider';
import { ProvideBuyBroxieStore } from 'providers/BuyBroxieStoreProvider';
import { ProvideEverWallet } from 'providers/EverWalletProvider';
import { ProvideMetaMask } from 'providers/MetaMaskProvider';

const ProvenanceRecordPage = React.lazy(
  () => import('modules/provenance-record')
);

const Providers = ({ children }: { children: any }) => {
  return (
    <ProvideStaticData>
      <ProvideBroxieStore>
        <ProvideIntl>
          <ProvideEverWallet>
            <ProvideMetaMask>
              <ProvideBuyBroxieStore>
                <BackgroundMusicProvider>
                  <BrowserRouter>
                    <ProvideLayout>{children}</ProvideLayout>
                  </BrowserRouter>
                </BackgroundMusicProvider>
              </ProvideBuyBroxieStore>
            </ProvideMetaMask>
          </ProvideEverWallet>
        </ProvideIntl>
      </ProvideBroxieStore>
    </ProvideStaticData>
  );
};

const App = () => {
  return (
    <Providers>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route
          index
          element={
            <>
              <LandingPage />
              <Footer />
            </>
          }
        />
        <Route
          path={BroxieRoutes.provenance_record.path}
          element={
            <Suspense>
              <ProvenanceRecordPage />
            </Suspense>
          }
        />
        <Route path='*' element={<Navigate to={BroxieRoutes.index.path} />} />
      </Routes>
    </Providers>
  );
};

export default App;
