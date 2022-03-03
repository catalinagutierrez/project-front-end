import React from "react";
import { connect } from "react-redux";

import { ReactComponent as Icon } from "../../assets/paw.svg";
import { toggleCartHidden } from "../../redux/cart-dropdown/cart-dropdown.actions";

import "./cart-icon.styles.scss";

const CartIcon = ({ toggleCartHidden }) => (
  <div className="wd-cart-icon" onClick={toggleCartHidden}>
    <Icon className="wd-shopping-icon" />
    <span className="wd-item-count">0</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
