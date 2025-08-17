import { IMAGES_PER_PAGE } from '@constants/constants';
import { UnsplashImage } from 'types/types';

const getRandomImages = async () => {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?count=${IMAGES_PER_PAGE}&client_id=${process.env.REACT_APP_ACCESS_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const data = (await response.json()) as UnsplashImage[];
  return data;
};

export default getRandomImages;
