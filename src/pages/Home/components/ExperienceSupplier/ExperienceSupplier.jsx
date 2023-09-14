import React, {useState } from "react";
import {Container} from 'react-bootstrap' 

import SliderPostImage   from "../../../../assets/images/slider-post-image.webp";

import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { ReactComponent as SliderArrow } from "../../../../assets/images/icons/icon-slider-right.svg";
import url from "../../../../assets/Video/myvideo.mp4"

const ExperienceSupplier = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { t } = useTranslation();

  const [videoPlay, setVideoPlay] = useState(false);
  const home = t("home", { returnObjects: true });
  const imageView = {
    "SliderPostImage" : SliderPostImage,
    "SliderPostImage1" : SliderPostImage,
    "SliderPostImage2" : SliderPostImage,
    "SliderPostImage3" : SliderPostImage,
}
  const NextButton = (props) => (
    <button onClick={props.onClick} className="slick-arrow next-btn">
      <SliderArrow />
    </button>
  );
  const PrevButton = (props) => (
    <button onClick={props.onClick} className="slick-arrow prev-btn">
      <SliderArrow />
    </button>
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    beforeChange: (current, next) => {
      setActiveTab(next)
      next && setVideoPlay(false)
    },
  };

  return (
    <section className="experiences-suppliers">
      <Container>
        <div className="experiences-inner">
          <Slider className="experiences-slider" {...settings}>
            {home?.ExperiencesSuppliers?.SliderImages?.map((image,i) => {
              return (
                <div className="video" key={i}>
                 
                   <img 
                    className={`${!videoPlay ?"show-poster":"hide-poster"}`}
                 
                    src={imageView[image.videoplaceholder]}
                    onClick={() => setVideoPlay(true)}
                    alt = "Not found"
                  />
                  
                  <video className={`${videoPlay ?"show-poster":"hide-poster"}`} autoPlay muted >
                    <source
                      src={url}
                      type="video/mp4"
                    />
                  </video>
                </div>
              );
            })}
          </Slider>

          <div className="experiences-content">
            <h2>{home.ExperiencesSuppliers.SliderImages?.[activeTab]?.content.title}</h2>
            <h4>{home.ExperiencesSuppliers.SliderImages?.[activeTab]?.content.ExperienceName}</h4>
            <h3>{home.ExperiencesSuppliers.SliderImages?.[activeTab]?.content.ExperienceLocation}</h3>
            <p>{home.ExperiencesSuppliers.SliderImages?.[activeTab]?.content.descreption1}</p>
            <p>{home.ExperiencesSuppliers.SliderImages?.[activeTab]?.content.descreption2}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ExperienceSupplier;
