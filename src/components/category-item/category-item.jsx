import React from "react";

import "./category-item.styles.scss";

const CategoryItem = ({ id, name, age, imageUrl }) => (
  <div className="wd-category-item">
    <div
      className="wd-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="wd-category-footer">
      <span className="wd-name">{name}</span>
      <span className="wd-price">{age}</span>
    </div>
  </div>
);

export default CategoryItem;
