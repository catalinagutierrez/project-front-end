import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CategoryItem from "../../components/category-item/category-item";

import "./category.styles.scss";

const CategoryPage = () => {
  const categories = useSelector((state) => state.categories.categories);
  const { categoryUrlName } = useParams();

  const category = categories.find(
    (category) => category.routeName === categoryUrlName
  );
  const { title, items } = category;

  return (
    <div className="wd-category-page">
      <h2 className="wd-title">{title}</h2>
      <div className="wd-items">
        {items.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
