import bgImg from '@assets/bg-img.svg';
import PhotosGenerate from '@components/PhotoGenerate/PhotosGenerate';

import './Category.css';

const Category = () => {
  return (
    <div>
      <div className="image-container">
        <img src={bgImg} alt="Background Image" />
      </div>
      <PhotosGenerate />
    </div>
  );
};

export default Category;
