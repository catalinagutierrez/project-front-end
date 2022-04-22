import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CategoryMap from "../../redux/directory/category-map";
import CategoryItem from "../../components/category-item/category-item";

import "./category.styles.scss";

const CategoryPage = () => {
  const data = useSelector((state) => state.petData.data);
  const { categoryUrlName } = useParams();

  const items = data.filter(
    (item) =>
      CategoryMap[categoryUrlName].species.includes(item.species) &&
      CategoryMap[categoryUrlName].age.includes(item.age)
  );

  return (
    <div className="wd-category-page">
      <h2 className="wd-title">{categoryUrlName.toUpperCase()}</h2>
      {items.length === 0 ? (
        <div>
          Looks like there are not pets available at the moment. Please come
          back soon!
        </div>
      ) : (
        <div className="wd-items">
          {items.map((item) => (
            <CategoryItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
