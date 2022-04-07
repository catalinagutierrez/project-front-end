import React from "react";

import "./pet-information.styles.scss";

const PetInformation = ({ item }) => {
  return (
    <div>
      <div className="wd-pet-information">
        <img
          src={item.primary_photo_cropped.full}
          alt="pet"
          className="wd-pet-img"
        />
        <div className="wd-pet-details">
          <h1>{item.name.toUpperCase()}</h1>
          <p>
            <b>Age:</b> {item.age}
          </p>
          <p>
            <b>Gender:</b> {item.gender}
          </p>
          <p>
            <b>Size:</b> {item.size}
          </p>
          <p>
            <b>Breed:</b> {item.breeds.primary}
          </p>
          <p>
            {item.description} <a href={item.url}>read more</a>
          </p>
        </div>
      </div>
      <hr />
      <div className="wd-pet-photos">
        {item.photos.map((photo) => (
          <img
            key={photo.small}
            src={photo.large}
            alt="pet"
            className="wd-pet-img"
          />
        ))}
      </div>
    </div>
  );
};

export default PetInformation;
