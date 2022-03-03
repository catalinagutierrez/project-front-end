import React from "react";

import "./button.styles.scss";

const Button = ({ children, inverted, ...otherProps }) => (
  <button
    className={`${inverted ? "wd-inverted" : ""} wd-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default Button;
