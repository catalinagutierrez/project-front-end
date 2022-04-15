import React from "react";
import { useSelector } from "react-redux";

import CategoryPreview from "../category-preview/category-preview";

import "./category-overview.styles.scss";

const CategoryOverview = () => {
  const data = useSelector((state) => state.petData.data);

  // separate data into categories to be displayed
  const cats = data.filter(
    (item) =>
      item.species === "cat" && item.age !== "baby" && item.age !== "senior"
  );
  const dogs = data.filter(
    (item) =>
      item.species === "dog" && item.age !== "baby" && item.age !== "senior"
  );
  const puppies = data.filter(
    (item) => item.spaces === "dog" && item.age === "baby"
  );
  const kittens = data.filter(
    (item) => item.species === "cat" && item.age === "baby"
  );
  const seniors = data.filter((item) => item.age === "senior");

  return (
    <div>
      {data.length === 0 ? (
        <div>
          Looks like there are not pets available at the moment. Please come
          back soon!
        </div>
      ) : (
        <div className="wd-category-overview">
          <CategoryPreview key="cats" title="cats" items={cats} />
          <CategoryPreview key="dogs" title="dogs" items={dogs} />
          <CategoryPreview key="kittens" title="kittens" items={kittens} />
          <CategoryPreview key="puppies" title="puppies" items={puppies} />
          <CategoryPreview key="seniors" title="seniors" items={seniors} />
        </div>
      )}
    </div>
  );
};

export default CategoryOverview;
