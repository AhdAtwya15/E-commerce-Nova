import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

export default function SimpleSlider() {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    pauseOnHover: false,
    pauseOnFocus: false,
    lazyLoad: "ondemand", 
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide-wrapper">
          <img 
            className="slide-image" 
            src="https://res.cloudinary.com/df2nbeovz/slider-4_wi4gqc" 
            alt="slider-1" 
          />
        </div>
        <div className="slide-wrapper">
          <img 
            className="slide-image" 
            src="https://res.cloudinary.com/df2nbeovz/slider-2_nof9su" 
            alt="slider-2" 
          />
        </div>
        <div className="slide-wrapper">
          <img 
            className="slide-image" 
            src="https://res.cloudinary.com/df2nbeovz/slider-1_kpyemd" 
            alt="slider-3" 
          />
        </div>
        <div className="slide-wrapper">
          <img 
            className="slide-image" 
            src="https://res.cloudinary.com/df2nbeovz/slider-3_vijkrv" 
            alt="slider-4" 
          />
        </div>
        <div className="slide-wrapper">
          <img 
            className="slide-image" 
            src="https://res.cloudinary.com/df2nbeovz/slider-5_ichlyn" 
            alt="slider-5" 
          />
        </div>
      </Slider>
    </div>
  );
}
