import React from 'react';

import favFilled from '@assets/icons/FavoriteFilled.svg';

interface FavoriteImageCardProps {
  image: any;
  handleRemoveFavorite: (id: string) => void;
  handleImageClick: (image: any, index: number) => void;
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
