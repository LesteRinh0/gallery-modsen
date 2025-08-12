import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '@components/Footer/Footer';
import Navigate from '@components/Navigator/Navigate';
import Category from '@pages/Category/Category';
import Favourites from '@pages/Favorites/Favorites';
import Images from '@pages/Images/Images';
import NotFound from '@pages/NotFound/NotFound';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navigate />
        </header>

        <Routes>
          <Route path="/" element={<Category />} />
          <Route path="/images" element={<Images />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
