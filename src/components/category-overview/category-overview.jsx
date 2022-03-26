import React from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../category-preview/category-preview";

import "./category-overview.styles.scss";

const CategoryOverview = () => {
  const categories = useSelector((state) => state.categories.categories);

  return (
    <div className="wd-category-overview">
      {categories.map(({ id, ...otherCategoryProps }) => (
        <CategoryPreview key={id} {...otherCategoryProps} />
      ))}
    </div>
  );
};

export default CategoryOverview;
