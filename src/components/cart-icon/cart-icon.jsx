import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as Icon } from "../../assets/paw.svg";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) =>
    state.cart.cartItems.reduce(
      (accumalatedQuantity, cartItem) => accumalatedQuantity + 1,
      0
    )
  );

  return (
    <div className="wd-cart-icon" onClick={() => toggleCartHidden(dispatch)}>
      <Icon className="wd-shopping-icon" />
      <span className="wd-item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
