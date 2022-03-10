import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ReactComponent as Logo } from "../../assets/cat.svg";
import CartIcon from "../cart-icon/cart-icon";
import CartDropdown from "../cart-dropdown/cart-dropdown";

import { selectCurrentUser } from "../../redux/user/users.selectors";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { setCurrentUser } from "../../redux/user/user.actions";
import { clearCart } from "../../redux/cart/cart.actions";

import "./header.styles.scss";

const Header = ({ hidden, currentUser, clearCart, setCurrentUser }) => (
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
          <Link className="option" to="/user">
            PROFILE
          </Link>
          <Link
            className="wd-option"
            onClick={() => {
              //   cartItems.map((item) => removeItem(item));
              clearCart();
              setCurrentUser(null);
            }}
            to="/home"
          >
            SIGN OUT
          </Link>
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      {currentUser && <CartIcon />}
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
