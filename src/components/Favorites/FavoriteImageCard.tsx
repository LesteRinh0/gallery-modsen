import React from 'react';

import favFilled from '@assets/icons/FavoriteFilled.svg';
import { UnsplashImage } from 'types/types';

interface FavoriteImageCardProps {
  image: UnsplashImage;
  handleRemoveFavorite: (id: string) => void;
  handleImageClick: (image: UnsplashImage, index: number) => void;
  index: number;
}

const FavoriteImageCard: React.FC<FavoriteImageCardProps> = ({
  image,
  handleRemoveFavorite,
  handleImageClick,
  index,
}) => {
  return (
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
          src={favFilled}
          alt="Удалить из избранного"
          className="remove-favorite-icon"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(image.id);
          }}
        />
      </div>
    </div>
  );
};

export default FavoriteImageCard;
