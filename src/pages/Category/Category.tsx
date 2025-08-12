import bgImg from '@assets/bg-img.png';
import PhotoesGenerate from '@utils/PhotosGenerate';

import './Category.css';

const Category = () => {
  return (
    <div>
      <div className="image-container">
        <img src={bgImg} alt="Background Image" />
        <div className="text-overlay">
          <span>Let's Find Some </span>
          <span className="orange">Images</span>
          <span> Here!</span>
        </div>
      </div>
      <PhotoesGenerate />
    </div>
  );
};

export default Category;
