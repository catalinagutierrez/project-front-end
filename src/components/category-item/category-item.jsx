import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import { addItem } from "../../redux/cart/cart.actions";

import image from "../../assets/anonymous-pet.jpg";

import "./category-item.styles.scss";

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const name = item.name;
  const gender = item.gender;
  let imageUrl = image;
  try {
    imageUrl = item.photos[0].large;
  } catch {}

  return (
    <div className="wd-category-item">
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
      <Button
        inverted
        onClick={() => {
          currentUser
            ? dispatch(addItem(item))
            : navigate("/signin", { replace: true });
        }}
      >
        {currentUser ? "ADOPT" : "SIGN IN TO ADOPT"}
      </Button>
    </div>
  );
};

export default CategoryItem;
