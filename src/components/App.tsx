import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from 'modules/landing/landing';
import Navbar from './layout/navbar';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
