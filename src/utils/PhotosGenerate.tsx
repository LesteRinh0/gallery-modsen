import { useEffect, useState } from 'react';

import API_URL from '@constants/api_url';

interface Photo {
  id: number;
  urls: string[];
  alt: string;
}

const PhotoesGenerate = () => {
  const [photoes, setPhotoes] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotoes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setPhotoes(data);
          setError(null);
        } else {
          setError('No images found');
          setPhotoes([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch images.');
        setPhotoes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotoes();
  }, []);

  if (isLoading) {
    return <div>Loading images...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Упс, что-то пошло не так!</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {photoes.length === 0 ? (
        <h1>Здесь должны были быть фото</h1>
      ) : (
        photoes.map((photo: Photo) => (
          <div key={photo.id}>
            <img src={photo.urls[0]} alt={photo.alt} />
          </div>
        ))
      )}
    </div>
  );
};

export default PhotoesGenerate;
