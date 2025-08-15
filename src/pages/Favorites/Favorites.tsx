import { useEffect, useState } from 'react';

import favFilled from '@assets/icons/FavoriteFilled.svg';

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

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleRemoveFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="favorites-container">
      {favorites.length === 0 ? (
        <h1 className="empty-list-message">Your Favorites List is Empty</h1>
      ) : (
        <>
          <h2 className="save-by-you">Saved by you</h2>
          <h1 className="your-favorites">Your favorites list:</h1>
          <div className="image-grid">
            {favorites.map((image) => (
              <div key={image.id} className="image-block">
                <img
                  src={image.urls.regular || image.urls.small}
                  alt={image.alt_description || 'Image'}
                  className="grid-image"
                />
                <div className="image-label">
                  <span>{image.alt_description || 'Без описания'}</span>
                  <img
                    src={favFilled}
                    alt="Удалить из избранного"
                    className="remove-favorite-icon"
                    onClick={() => handleRemoveFavorite(image.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Favorites;
