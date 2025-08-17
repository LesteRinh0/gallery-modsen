import arrowLeft from '@assets/icons/Arrow-left.svg';
import arrowRight from '@assets/icons/Arrow-right.svg';
import closeIcon from '@assets/icons/Close.svg';
import { truncateText } from '@utils/helpers';
import { UnsplashImage } from 'types/types';

interface FullscreenOverlayProps {
  goToPreviousImage: () => void;
  selectedImage: UnsplashImage;
  getFavoriteIcon: (imageId: string) => string;
  toggleFavorite: (image: UnsplashImage) => void;
  goToNextImage: () => void;
  handleCloseFullscreen: () => void;
}
export const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({
  goToPreviousImage,
  selectedImage,
  getFavoriteIcon,
  toggleFavorite,
  goToNextImage,
  handleCloseFullscreen,
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
        <img
          src={selectedImage.urls.regular}
          alt={selectedImage.alt_description || 'Fullscreen Image'}
          className="grid-image"
        />
        <div className="image-label">
          <span>{truncateText(selectedImage.alt_description || 'Без описания', 50)}</span>
          <img
            src={getFavoriteIcon(selectedImage.id)}
            alt="Favorite"
            className="favorite-icon"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(selectedImage);
            }}
          />
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
