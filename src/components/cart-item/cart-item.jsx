import React from "react";

import image from "../../assets/anonymous-pet.jpg";

import "./cart-item.styles.scss";

const CartItem = ({ item }) => {
  const name = item.name;
  let imageUrl = image;
  try {
    imageUrl = item.photos[0].large;
  } catch {}

  return (
    <div className="wd-cart-item">
      <img src={imageUrl} alt="pupper" />
      <div className="wd-item-details">
        <span className="wd-name">{name}</span>
      </div>
    </div>
  );
};

export default CartItem;
