import React from "react";
import { useNavigate } from "react-router-dom";

import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
  let navigate = useNavigate();

  return (
    <div
      className={`${size} wd-menu-item`}
      onClick={() => navigate(`${linkUrl}`)}
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
