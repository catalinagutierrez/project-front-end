import React from "react";
import { useNavigate } from "react-router-dom";

import CategoryItem from "../category-item/category-item";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, items, routeName }) => {
  let navigate = useNavigate();

  return (
    <div className="wd-category-preview">
      <h1
        className="wd-title"
        onClick={() => {
          navigate(`${routeName}`);
        }}
      >
        {title.toUpperCase()}
      </h1>
      <div className="wd-preview">
        {items
          .filter((item, idx) => idx < 4)
          .map((item) => (
            <CategoryItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
