import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loader from '@components/Loader/Loader';
import API_URL from '@constants/api_url';

import './PhotoGenerate.css';

interface Theme {
  id: string;
  slug: string;
  title: string;
  imageUrl?: string;
}

const PhotosGenerate = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleImageClick = (themeSlug: string) => {
    navigate(`/search?query=${themeSlug}`);
  };

  useEffect(() => {
    const fetchThemesWithImages = async () => {
      setLoading(true);

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          console.error(`Ошибка при получении списка тем: ${response.status}`);
          return;
        }

        const data: any[] = await response.json();

        const themesWithImages = data.map((topic) => ({
          id: topic.id,
          slug: topic.slug,
          title: topic.title,
          imageUrl: topic.cover_photo?.urls?.small || null,
        }));

        setThemes(themesWithImages);
      } catch (error) {
        console.error('Ошибка при получении списка тем и обложек:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemesWithImages();
  }, []);

  return (
    <div className="main-block">
      <div className="block-box">
        {loading ? (
          <Loader />
        ) : (
          themes.map((themeItem) => (
            <div className="box-image" key={themeItem.id}>
              <h2>{themeItem.title}</h2>
              {themeItem.imageUrl ? (
                <img
                  className="image-card"
                  src={themeItem.imageUrl}
                  alt={themeItem.title}
                  onClick={() => handleImageClick(themeItem.slug)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <div>No image available</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PhotosGenerate;
