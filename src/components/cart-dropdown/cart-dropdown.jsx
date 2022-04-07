import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import CartItem from "../cart-item/cart-item";

import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  return (
    <div className="wd-cart-dropdown">
      <div className="wd-cart-items">
        {cart.cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/application");
          toggleCartHidden(dispatch);
        }}
      >
        APPLY
      </Button>
    </div>
  );
};

export default CartDropdown;
