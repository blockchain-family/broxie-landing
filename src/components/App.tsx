import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import ScrollToTop from './layout/scroll-to-top';
import LandingPage from 'modules/landing';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
