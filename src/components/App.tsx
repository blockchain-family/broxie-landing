import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './layout/navbar';
import Footer from './layout/footer';
import LandingPage from 'modules/landing';
import GalleryPage from 'modules/gallery';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
        <Route path='gallery' element={<GalleryPage />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
