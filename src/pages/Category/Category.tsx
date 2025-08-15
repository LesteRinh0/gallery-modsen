import bgImg from '@assets/bg-img.png';
import PhotosGenerate from '@utils/PhotoGenerate/PhotosGenerate';

import './Category.css';

const Category = () => {
  return (
    <div>
      <div className="image-container">
        <img src={bgImg} alt="Background Image" />
        <div className="text-overlays">
          <span>Let's Find Some </span>
          <span className="orange">Images</span>
          <span> Here!</span>
        </div>
      </div>
      <PhotosGenerate />
    </div>
  );
};

export default Category;
