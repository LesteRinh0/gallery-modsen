import React from 'react';

import arrowLeft from '@assets/icons/Arrow-left.svg';
import arrowRight from '@assets/icons/Arrow-right.svg';
import closeIcon from '@assets/icons/Close.svg';
import favFilled from '@assets/icons/FavoriteFilled.svg';

interface FullscreenImageProps {
  selectedImage: any;
  handleCloseFullscreen: () => void;
  goToPreviousImage: () => void;
  goToNextImage: () => void;
  handleRemoveFavorite: (id: string) => void;
}

const FullscreenImage: React.FC<FullscreenImageProps> = ({
  selectedImage,
  handleCloseFullscreen,
  goToPreviousImage,
  goToNextImage,
  handleRemoveFavorite,
}) => {
  return (
    <div className="fullscreen-overlay" onClick={handleCloseFullscreen}>
      <div className="fullscreen-image-block">
        <button
          className="arrow-button left"
          onClick={(e) => {
            e.stopPropagation();
            goToPreviousImage();
          }}
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
              src={favFilled}
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
        >
          <img src={arrowRight} alt="Next" />
        </button>
        <button className="close-button" onClick={handleCloseFullscreen}>
          <img src={closeIcon} alt="Close" />
        </button>
      </div>
    </div>
  );
};

export default FullscreenImage;
