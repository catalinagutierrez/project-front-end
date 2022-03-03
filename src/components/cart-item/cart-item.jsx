import React from "react";

import "./cart-item.styles.scss";

const CartItem = ({ item: { imageUrl, name } }) => (
  <div className="wd-cart-item">
    <img src={imageUrl} alt="pupper" />
    <div className="wd-item-details">
      <span className="wd-name">{name}</span>
    </div>
  </div>
);

export default CartItem;
