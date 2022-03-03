import React from "react";

import CategoryPreview from "../../components/category-preview/category-preview";
import categories from "./categories.data";

const CategoriesPage = () => {
  return (
    <div className="wd-category-page">
      {categories.map(({ id, ...otherCategoryProps }) => (
        <CategoryPreview key={id} {...otherCategoryProps} />
      ))}
    </div>
  );
};

export default CategoriesPage;
