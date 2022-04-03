import React from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../category-preview/category-preview";

import "./category-overview.styles.scss";

const CategoryOverview = () => {
  const data = useSelector((state) => state.petData.data);

  return (
    <div>
      {data.length === 0 ? (
        <div>
          Looks like there are not pets available at the moment. Please come
          back soon!
        </div>
      ) : (
        <div className="wd-category-overview">
          {data.map((category) => (
            <CategoryPreview
              key={category.id}
              title={category.title}
              items={category.items}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryOverview;
