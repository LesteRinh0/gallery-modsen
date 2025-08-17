import FavoriteImageCard from '@components/Favorites/FavoriteImageCard';
import FullscreenImage from '@components/Favorites/FullscreenImage';
import useFavorites from '@hooks/useFavorites';

import './Favorites.css';

const Favorites = () => {
  const {
    favorites,
    handleRemoveFavorite,
    selectedImage,
    handleImageClick,
    handleCloseFullscreen,
    goToPreviousImage,
    goToNextImage,
  } = useFavorites();

  return (
    <div className="favorites-container">
      {favorites.length === 0 ? (
        <h1 className="empty-list-message">Your Favorites List is Empty</h1>
      ) : (
        <>
          <h2 className="save-by-you">Saved by you</h2>
          <h1 className="your-favorites">Your favorites list:</h1>
          <div className="image-grid">
            {favorites.map((image, index) => (
              <FavoriteImageCard
                key={image.id}
                image={image}
                handleRemoveFavorite={handleRemoveFavorite}
                handleImageClick={handleImageClick}
                index={index}
              />
            ))}
          </div>
          {selectedImage && (
            <FullscreenImage
              selectedImage={selectedImage}
              handleCloseFullscreen={handleCloseFullscreen}
              goToPreviousImage={goToPreviousImage}
              goToNextImage={goToNextImage}
              handleRemoveFavorite={handleRemoveFavorite}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Favorites;
