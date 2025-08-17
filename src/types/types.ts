export interface UnsplashImage {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
}

export type SortOrder = 'relevant' | 'latest';

export interface ThemeWithImagesResponse {
  id: string;
  slug: string;
  title: string;
  cover_photo?: {
    urls?: {
      small: string;
    };
  };
}
