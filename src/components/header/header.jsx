import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/cat.svg";

import "./header.styles.scss";

const Header = () => (
  <div className="wd-header">
    <Link className="wd-logo-container" to="/home">
      <Logo className="wd-logo" />
    </Link>
    <div className="wd-options">
      <Link className="wd-option" to="/collection">
        DISCOVER
      </Link>
    </div>
    <div className="wd-options">
      <Link className="wd-option" to="/signin">
        SIGN-IN
      </Link>
    </div>
  </div>
);

export default Header;
