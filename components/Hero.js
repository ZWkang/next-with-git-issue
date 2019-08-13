import React from "react";
import ColorBlock from "./colorBlock";

import "./hero.scss";

const Hero = props => {
  const { image, title } = props;
  return (
    <section className="hero-container">
      <div className="hero-container-messages">
        <h1 className="hero-container-messages__title">{title}</h1>
      </div>
      <div className="hero-container-info">
        ·
        {image ? (
          <img className="hero-container-info__picture" src={image} />
        ) : (
          <ColorBlock color="yellow" />
        )}
      </div>
    </section>
  );
};

export default Hero;
