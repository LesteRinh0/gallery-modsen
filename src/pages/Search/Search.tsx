import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import bgImg from '@assets/bg-img2.svg';
import favorite from '@assets/icons/Favorite.svg';
import favoriteFilled from '@assets/icons/FavoriteFilled.svg';
import searchIcn from '@assets/icons/Search.svg';
import Loader from '@components/Loader/Loader';
import { FullscreenOverlay } from '@components/Search/FullscreenOverlay';
import getRandomImages from '@utils/getRandomImages';
import { getVisiblePageNumbers, truncateText } from '@utils/helpers';
import searchImage from '@utils/searchImages';
import { SortOrder, UnsplashImage } from 'types/types';

import './Search.css';

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
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);

  const searchImages = useCallback(
    async (query: string, sort: SortOrder, page: number) => {
      try {
        const data = await searchImage(query, sort, page);
        setImages(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error('Ошибка запроса фото:', error);
        setImages([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [setImages, setLoading, setTotalPages],
  );

  const fetchRandomImages = useCallback(async () => {
    try {
      const data = await getRandomImages();
      setImages(data);
      setTotalPages(1);
    } catch (error) {
      console.error('Ошибка запроса рандомных фото:', error);
      setImages([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [setImages, setLoading, setTotalPages]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialQuery = params.get('query') || '';
    setSearchQuery(initialQuery);
    setLoading(true);

    if (initialQuery) {
      searchImages(initialQuery, sortOrder, currentPage);
    } else {
      fetchRandomImages();
    }
  }, [location.search, sortOrder, currentPage, searchImages, fetchRandomImages]);

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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value as SortOrder);
    setCurrentPage(1);
  };

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

  const getFavoriteIcon = (imageId: string) => {
    return isFavorite(imageId) ? favoriteFilled : favorite;
  };

  const handleImageClick = (image: UnsplashImage) => {
    setSelectedImage(image);
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
  };

  const goToPreviousImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
  };

  const goToNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const visiblePageNumbers = getVisiblePageNumbers(totalPages, currentPage);

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
          <div className="sort-group">
            <label htmlFor="sortOrder">Sort by:</label>
            <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
              <option value="relevant">Relevant</option>
              <option value="latest">Latest</option>
            </select>
          </div>
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
                    onClick={() => handleImageClick(image)}
                  />
                  <div className="image-label">
                    <span>{truncateText(image.alt_description || 'Без описания', 50)}</span>
                    <img
                      src={getFavoriteIcon(image.id)}
                      alt="Favorite"
                      className="favorite-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(image);
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
      {selectedImage && (
        <FullscreenOverlay
          goToPreviousImage={goToPreviousImage}
          selectedImage={selectedImage}
          getFavoriteIcon={getFavoriteIcon}
          toggleFavorite={toggleFavorite}
          goToNextImage={goToNextImage}
          handleCloseFullscreen={handleCloseFullscreen}
        />
      )}
    </div>
  );
};

export default Search;
