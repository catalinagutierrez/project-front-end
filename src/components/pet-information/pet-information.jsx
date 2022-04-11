import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./pet-information.styles.scss";

const PetInformation = ({ item }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const profileUrl = `/profile/${item.contact.userId}`;

  return (
    <div>
      <div className="wd-pet-information">
        {item.photos && (
          <img src={item.photos[0]} alt="pet" className="wd-pet-img" />
        )}
        <div className="wd-pet-information-body">
          <h1>{item.name.toUpperCase()}</h1>
          {item.contact.userId && (
            <span>
              Posted by <Link to={profileUrl}>{currentUser.name}</Link>
            </span>
          )}
          <hr />
          <div className="wd-pet-detail-group">
            <span className="wd-pet-detail">{item.age}</span>
            <span className="wd-pet-detail">{item.gender}</span>
            <span className="wd-pet-detail">{item.size}</span>
            <span className="wd-pet-detail">{item.breed.toLowerCase()}</span>
          </div>
          <hr />
          <p>
            {item.description} {item.url && <a href={item.url}>read more</a>}
          </p>
        </div>
        <div></div>
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
