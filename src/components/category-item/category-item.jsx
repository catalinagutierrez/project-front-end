import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import { addItem } from "../../redux/cart/cart.actions";

import "./category-item.styles.scss";

const CategoryItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);

  const { imageUrl, name, age } = item;

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
        <span className="wd-age">{age}</span>
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
