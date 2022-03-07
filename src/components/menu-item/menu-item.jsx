import React from "react";
import { useNavigate } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, routeName }) => {
  let navigate = useNavigate();

  return (
    <div
      className={`${size} wd-menu-item`}
      onClick={() => navigate("/discover/" + routeName, { replace: true })}
    >
      <div
        className="wd-background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="wd-content">
        <h1 className="wd-title">{title.toUpperCase()}</h1>
      </div>
    </div>
  );
};

export default MenuItem;
