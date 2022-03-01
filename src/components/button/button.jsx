import React from "react";

import "./button.styles.scss";

const Button = ({ children, ...otherProps }) => (
  <button className="wd-button" {...otherProps}>
    {children}
  </button>
);

export default Button;
