import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { ReactComponent as Logo } from "../../assets/cat.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import "./header.styles.scss";

const Header = ({ hidden }) => (
  <div className="wd-header">
    <Link className="wd-logo-container" to="/home">
      <Logo className="wd-logo" />
    </Link>
    <div className="wd-options">
      <Link className="wd-option" to="/collection">
        DISCOVER
      </Link>
      <Link className="option" to="/signin">
        SIGN IN
      </Link>
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = ({ cartDropdown: { hidden } }) => ({
  hidden,
});

export default connect(mapStateToProps)(Header);
