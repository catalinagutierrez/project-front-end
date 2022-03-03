import React from "react";

import CategoryPreview from "../../components/category-preview/category-preview";
import collections from "./collections.data";

const CategoriesPage = () => {
  return (
    <div className="wd-category-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CategoryPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CategoriesPage;
