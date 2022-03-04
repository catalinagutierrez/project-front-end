import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import CartItem from "../cart-item/cart-item";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import "./cart-dropdown.styles.scss";

const CartDropdown = ({ toggleCartHidden, cartItems }) => {
  let navigate = useNavigate();

  return (
    <div className="wd-cart-dropdown">
      <div className="wd-cart-items">
        {cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))}
      </div>
      <Button
        onClick={() => {
          navigate("/application");
          toggleCartHidden();
        }}
      >
        APPLY
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = (state) => ({
  cartItems: selectCartItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartDropdown);
