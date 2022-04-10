import React from "react";

import "./pet-information.styles.scss";

const PetInformation = ({ item }) => {
  return (
    <div>
      <div className="wd-pet-information">
        {item.photos && (
          <img src={item.photos[0]} alt="pet" className="wd-pet-img" />
        )}
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
            <b>Breed:</b> {item.breed}
          </p>
          <p>
            {item.description} {item.url && <a href={item.url}>read more</a>}
          </p>
        </div>
      </div>
      <hr />
      {item.photos && (
        <div className="wd-pet-photos">
          {item.photos.map((photo) => (
            <img key={photo} src={photo} alt="pet" className="wd-pet-img" />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetInformation;
