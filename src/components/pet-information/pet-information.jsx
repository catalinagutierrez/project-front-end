import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { updateUser } from "../../redux/user/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./pet-information.styles.scss";

const PetInformation = ({ item }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const profileUrl = `/profile/${item.contact.userId}`;

  let liked = false;
  if (currentUser) {
    liked = currentUser.likedItems.some((i) => i === item._id);
  }

  const likedButtonHandler = (event) => {
    event.stopPropagation();
    liked = !liked;
    if (liked) {
      updateUser(dispatch, {
        ...currentUser,
        likedItems: [...currentUser.likedItems, item._id],
      });
    } else {
      updateUser(dispatch, {
        ...currentUser,
        likedItems: [...currentUser.likedItems.filter((i) => i !== item._id)],
      });
    }
  };

  return (
    <div>
      <div className="wd-pet-information">
        {item.photos && (
          <img src={item.photos[0]} alt="pet" className="wd-pet-img" />
        )}
        <div className="wd-pet-information-body">
          <h1>
            {item.name.toUpperCase()}&nbsp;
            {currentUser && (
              <span onClick={(event) => likedButtonHandler(event)}>
                {liked ? (
                  <FontAwesomeIcon icon={faHeart} color="pink" size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faHeart} color="lightgrey" size="2x" />
                )}
              </span>
            )}
          </h1>

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
