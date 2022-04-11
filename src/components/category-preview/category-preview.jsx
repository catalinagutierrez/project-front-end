import React from "react";
import { useNavigate } from "react-router-dom";

import CategoryItem from "../category-item/category-item";

import "./category-preview.styles.scss";

const CategoryPreview = ({ title, items, customAltText }) => {
  let navigate = useNavigate();

  return (
    <div>
      {items.length === 0 ? (
        <div>
          <h1>{title.toUpperCase()}</h1>
          {customAltText
            ? customAltText
            : "Looks like there are not pets available at the moment. Please come back soon!"}
        </div>
      ) : (
        <div className="wd-category-preview">
          <h1
            className="wd-title"
            onClick={() => {
              navigate(`${title}`);
            }}
          >
            {title.toUpperCase()}
          </h1>
          <div className="wd-preview">
            {items
              .filter((item, idx) => item.photos.length > 0)
              .slice(0, 4)
              .map((item) => (
                <CategoryItem
                  key={item.id}
                  item={item}
                  category={item.category}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPreview;
