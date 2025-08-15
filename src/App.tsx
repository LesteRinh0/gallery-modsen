import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from '@components/Footer/Footer';
import Navigate from '@components/Navigator/Navigate';
import Category from '@pages/Category/Category';
import Favourites from '@pages/Favorites/Favorites';
import NotFound from '@pages/NotFound/NotFound';
import Search from '@pages/Search/Search';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Navigate />
      </header>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Category />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
