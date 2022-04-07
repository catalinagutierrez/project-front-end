import React from "react";
import img from "../../assets/404.jpg";

import "./not-found.styles.scss";

const NotFoundPage = () => (
  <div className="wd-not-found">
    <img src={img} alt="404" />
  </div>
);

export default NotFoundPage;
