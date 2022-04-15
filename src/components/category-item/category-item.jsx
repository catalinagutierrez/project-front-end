import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import { addItem } from "../../redux/cart/cart.actions";

import image from "../../assets/anonymous-pet.jpg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addLikedItem } from "../../redux/user/user.actions";
import { removeLikedItem } from "../../redux/user/user.actions";

import "./category-item.styles.scss";

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  let liked = false;
  if (currentUser) {
    liked = currentUser.likedItems.some((i) => i.id === item.id);
  }

  const name = item.name;
  const gender = item.gender;
  let imageUrl = image;
  try {
    imageUrl = item.photos[0];
  } catch {}

  const likedButtonHandler = (event) => {
    event.stopPropagation();
    liked = !liked;
    if (liked) {
      addLikedItem(dispatch, item);
    } else {
      removeLikedItem(dispatch, item);
    }
  };

  return (
    <div
      className="wd-category-item"
      onClick={() => {
        navigate(`/details?id=${item.id}`, {
          replace: true,
        });
      }}
    >
      <div
        className="wd-category-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="wd-category-footer">
        <span className="wd-name">{name}</span>
        <span className="wd-gender">{gender}</span>
      </div>
      {currentUser ? (
        currentUser.type === "buyer" && (
          <Button
            inverted
            onClick={(event) => {
              event.stopPropagation();
              currentUser
                ? addItem(dispatch, item)
                : navigate("/login", { replace: true });
            }}
          >
            ADOPT
          </Button>
        )
      ) : (
        <Button
          inverted
          onClick={(event) => {
            event.stopPropagation();
            currentUser
              ? addItem(dispatch, item)
              : navigate("/login", { replace: true });
          }}
        >
          SIGN IN TO ADOPT
        </Button>
      )}
      {currentUser && (
        <div
          className="wd-heart-icon"
          onClick={(event) => likedButtonHandler(event)}
        >
          {liked ? (
            <FontAwesomeIcon icon={faHeart} color="red" size="2x" />
          ) : (
            <FontAwesomeIcon icon={faHeart} color="white" size="2x" />
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
