import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import bgImg from '@assets/bg-img.png';
import favorite from '@assets/icons/Favorite.svg';
import searchIcn from '@assets/icons/Search.svg';
import Loader from '@components/Loader/Loader';

import './Search.css';

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

type SortOrder = 'relevant' | 'latest';

const IMAGES_PER_PAGE = 12;
const MAX_VISIBLE_PAGES = 3;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevant');
  const location = useLocation();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<UnsplashImage[]>(JSON.parse(localStorage.getItem('favorites') || '[]'));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get('query') || '';
    setSearchQuery(initialQuery);
    setLoading(true);

    if (initialQuery) {
      searchImages(initialQuery, sortOrder, currentPage);
    } else {
      setLoading(false);
    }
  }, [location.search, sortOrder, currentPage]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
      setLoading(true);
      searchImages(searchQuery, sortOrder, 1);
      setCurrentPage(1);
    }
  };

  const searchImages = async (query: string, sort: SortOrder, page: number) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&per_page=${IMAGES_PER_PAGE}&page=${page}&client_id=${process.env.REACT_APP_ACCES_KEY}&order_by=${sort}`,
      );

      if (!response.ok) {
        throw new Error(`Ошибка запроса: ${response.status}`);
      }

      const data = (await response.json()) as {
        results: UnsplashImage[];
        total: number;
        total_pages: number;
      };

      setImages(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error('Ошибка запроса фото:', error);
      setImages([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
    setCurrentPage(1);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const getVisiblePageNumbers = () => {
    const visiblePages: number[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
      let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

      if (endPage === totalPages) {
        startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
      }
    }

    return visiblePages;
  };

  const visiblePageNumbers = getVisiblePageNumbers();

  const isFavorite = (imageId: string) => {
    return favorites.some((fav) => fav.id === imageId);
  };

  const toggleFavorite = (image: UnsplashImage) => {
    if (isFavorite(image.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== image.id));
    } else {
      setFavorites([...favorites, image]);
    }
  };

  return (
    <div>
      <div className="image-container">
        <img src={bgImg} alt="Background Image" />
        <div className="text-overlay">
          <span>Let's Find Some </span>
          <span className="orange">Images</span>
          <span> Here!</span>

          <form onSubmit={handleSearchSubmit} className="search-form">
            <div className="search-input-wrapper">
              <button type="submit" className="search-icon-button">
                <img src={searchIcn} alt="search icon" className="search-icon" />
              </button>
              <input
                className="search-input"
                type="text"
                placeholder="Search Images"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="content-area">
        <div className="sort-container">
          <label htmlFor="sortOrder">Sort by:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="relevant">Relevant</option>
            <option value="latest">Latest</option>
          </select>
        </div>

        {loading ? (
          <Loader />
        ) : images.length === 0 ? (
          <div className="no-results">Введите тему для поиска</div>
        ) : (
          <>
            <div className="image-grid">
              {images.map((image) => (
                <div key={image.id} className="image-block">
                  <img
                    src={image.urls.regular || image.urls.small}
                    alt={image.alt_description || 'Image'}
                    className="grid-image"
                  />
                  <div className="image-label">
                    <span>{truncateText(image.alt_description || 'Без описания', 30)}</span>
                    <img
                      src={favorite}
                      alt="Favorite"
                      className="favorite-icon"
                      onClick={() => toggleFavorite(image)}
                      style={{
                        filter: isFavorite(image.id) ? 'brightness(0) saturate(100%) hue-rotate(320deg)' : 'none',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {currentPage > 1 && <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>}
              {visiblePageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={currentPage === pageNumber ? 'active' : ''}
                >
                  {pageNumber}
                </button>
              ))}
              {currentPage < totalPages && <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
