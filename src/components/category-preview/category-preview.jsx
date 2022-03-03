import React from "react";

import CategoryItem from "../category-item/category-item";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, items }) => (
  <div className="wd-category-preview">
    <h1 className="wd-title">{title.toUpperCase()}</h1>
    <div className="wd-preview">
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CategoryPreview;
