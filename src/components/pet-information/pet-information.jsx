import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../services/user-service";

import { updateUser } from "../../redux/user/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faX } from "@fortawesome/free-solid-svg-icons";

import "./pet-information.styles.scss";
import { deletePet } from "../../redux/pet-data/pet-data.actions";

const PetInformation = ({ item }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const profileUrl = `/profile?id=${item.contact.userId}`;

  let liked = false;
  if (currentUser && currentUser.type === "buyer") {
    liked = currentUser.likedItems.some((i) => i === item._id.toString());
  }

  useEffect(() => {
    if (item.contact.userId) {
      const fetchName = async () => {
        const user = await UserService.findUserById(item.contact.userId);
        setUserName(user.name);
      };
      fetchName();
    }
  }, [item.contact.userId]);

  const likedButtonHandler = (event) => {
    event.stopPropagation();
    liked = !liked;
    if (liked) {
      updateUser(dispatch, {
        ...currentUser,
        likedItems: [...currentUser.likedItems, item._id.toString()],
      });
    } else {
      updateUser(dispatch, {
        ...currentUser,
        likedItems: [
          ...currentUser.likedItems.filter((i) => i !== item._id.toString()),
        ],
      });
    }
  };

  const removeButtonHandler = async (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you wish to delete this item?")) {
      try {
        const user = await UserService.findUserById(item.contact.userId);
        if (user) {
          await UserService.updateUser({
            ...user,
            postedItems: [...user.postedItems.filter((i) => i !== item._id)],
          });
          await deletePet(dispatch, item);
        }
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
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
            {currentUser && currentUser.type === "buyer" && (
              <span onClick={(event) => likedButtonHandler(event)}>
                {liked ? (
                  <FontAwesomeIcon icon={faHeart} color="pink" size="2x" />
                ) : (
                  <FontAwesomeIcon icon={faHeart} color="lightgrey" size="2x" />
                )}
              </span>
            )}
            {currentUser &&
              currentUser.type === "admin" &&
              item.contact.userId && (
                <span onClick={(event) => removeButtonHandler(event)}>
                  <FontAwesomeIcon icon={faX} color="gray" size="2x" />
                </span>
              )}
          </h1>

          {item.contact.userId && (
            <span>
              Posted by <Link to={profileUrl}>{userName}</Link>
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
