import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ReactComponent as Logo } from "../../assets/cat.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { setCurrentUser } from "../../redux/user/user.actions";
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
        <Link className="wd-option" to="/discover">
          DISCOVER
        </Link>
        {currentUser ? (
          <div>
            <Link className="option" to="/profile">
              PROFILE
            </Link>
            {currentUser.type === "seller" && (
              <Link className="wd-option" to="/add">
                PLACE FOR ADOPTION
              </Link>
            )}
            <Link
              className="wd-option"
              onClick={() => {
                clearCart(dispatch);
                setCurrentUser(dispatch, null);
              }}
              to="/home"
            >
              SIGN OUT
            </Link>
          </div>
        ) : (
          <Link className="option" to="/login">
            SIGN IN
          </Link>
        )}
        {currentUser && currentUser.type === "buyer" && <CartIcon />}
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
