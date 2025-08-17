import { useEffect, useState } from 'react';

import { UnsplashImage } from 'types/types';

const useFavorites = () => {
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
      setCurrentIndex(0);
    }
  };

  const handleImageClick = (image: UnsplashImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
  };

  const goToPreviousImage = () => {
    if (favorites.length === 0) return;
    const previousIndex = (currentIndex - 1 + favorites.length) % favorites.length;
    setCurrentIndex(previousIndex);
    setSelectedImage(favorites[previousIndex]);
  };

  const goToNextImage = () => {
    if (favorites.length === 0) return;
    const nextIndex = (currentIndex + 1) % favorites.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(favorites[nextIndex]);
  };

  return {
    favorites,
    handleRemoveFavorite,
    selectedImage,
    setSelectedImage,
    currentIndex,
    setCurrentIndex,
    handleImageClick,
    handleCloseFullscreen,
    goToPreviousImage,
    goToNextImage,
  };
};

export default useFavorites;
