import { IMAGES_PER_PAGE } from '@constants/constants';
import { SortOrder, UnsplashImage } from 'types/types';

const searchImage = async (query: string, sort: SortOrder, page: number) => {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=${IMAGES_PER_PAGE}&page=${page}&client_id=${process.env.REACT_APP_ACCESS_KEY}&order_by=${sort}`,
  );

  if (!response.ok) {
    throw new Error(`Ошибка запроса: ${response.status}`);
  }

  const data = (await response.json()) as {
    results: UnsplashImage[];
    total: number;
    total_pages: number;
  };
  return data;
};

export default searchImage;
