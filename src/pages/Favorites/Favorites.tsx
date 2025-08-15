import { useEffect, useState } from 'react';
import favoriteFilled from '@assets/icons/FavoriteFilled.svg';
import closeIcon from '@assets/icons/Close.svg'; 
import arrowLeft from '@assets/icons/Arrow-left.svg';
import arrowRight from '@assets/icons/Arrow-right.svg';

import './Favorites.css'; 

interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<UnsplashImage[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    if (selectedImage && selectedImage.id === id) {
      setSelectedImage(null);
    }
  };

  const handleImageClick = (image: UnsplashImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index)
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
  };

  const goToPreviousImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedImage(favorites[currentIndex - 1]);
    }
  };

  const goToNextImage = () => {
    if (currentIndex < favorites.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedImage(favorites[currentIndex + 1]);
    }
  };

  return (
    <>
      {favorites.length === 0 ? (
        <p className="empty-list-message">Your Favorites List is Empty</p>
      ) : (
        <div className="favorites-container">
          <h2 className="save-by-you">Saved by you</h2>
          <h1 className="your-favorites">Your favorites list:</h1>
          <div className="image-grid">
            {favorites.map((image, index) => (
              <div key={image.id} className="image-block">
                <img
                  src={image.urls.regular || image.urls.small}
                  alt={image.alt_description || 'Image'}
                  className="grid-image"
                  onClick={() => handleImageClick(image, index)}
                />
                <div className="image-label">
                  <span>{image.alt_description || 'Без описания'}</span>
                  <img
                    src={favoriteFilled}
                    alt="Удалить из избранного"
                    className="remove-favorite-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(image.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {selectedImage && (
            <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
              <div className="fullscreen-image-block">
                <button
                  className="arrow-button left"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPreviousImage();
                  }}
                  disabled={currentIndex === 0}
                >
                  <img src={arrowLeft} alt="Previous" />
                </button>
                <div className="image-container-wrapper">
                  <img
                    src={selectedImage.urls.regular}
                    alt={selectedImage.alt_description || 'Fullscreen Image'}
                    className="grid-image"
                  />
                  <div className="image-label">
                    <span>{selectedImage.alt_description || 'Без описания'}</span>
                    <img
                      src={favoriteFilled}
                      alt="Удалить из избранного"
                      className="remove-favorite-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFavorite(selectedImage.id);
                      }}
                    />
                  </div>
                </div>
                <button
                  className="arrow-button right"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNextImage();
                  }}
                  disabled={currentIndex === favorites.length - 1}
                >
                  <img src={arrowRight} alt="Next" />
                </button>
                <button className="close-button" onClick={handleCloseFullscreen}>
                  <img src={closeIcon} alt="Close" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Favorites;