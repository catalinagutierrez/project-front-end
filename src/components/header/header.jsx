import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as Logo } from "../../assets/cat.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { signOut } from "../../redux/user/user.actions";
import { clearCart } from "../../redux/cart/cart.actions";

import "./header.styles.scss";

const Header = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const hidden = useSelector((state) => state.cart.hidden);

  return (
    <div className="wd-header">
      <Link className="wd-logo-container" to="/home">
        <Logo className="wd-logo" />
      </Link>
      <div className="wd-options">
        <Link className="wd-option" to="/search">
          SEARCH
        </Link>
        <Link className="wd-option" to="/discover">
          DISCOVER
        </Link>
        {currentUser ? (
          <Link className="wd-option" to="/profile">
            PROFILE
          </Link>
        ) : (
          <Link className="wd-option" to="/login">
            SIGN IN
          </Link>
        )}
        {currentUser && currentUser.type === "seller" && (
          <Link className="wd-option" to="/add">
            PLACE FOR ADOPTION
          </Link>
        )}
        {currentUser && currentUser.type === "admin" && (
          <Link className="wd-option" to="/createAccount">
            CREATE ACCOUNT
          </Link>
        )}
        {currentUser && currentUser.type === "buyer" && <CartIcon />}
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
