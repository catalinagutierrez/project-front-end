import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CategoryItem from "../../components/category-item/category-item";

import "./category.styles.scss";

const CategoryPage = () => {
  const data = useSelector((state) => state.petData.data);
  const { categoryUrlName } = useParams();

  const category = data.find((category) => category.title === categoryUrlName);
  const { title, items } = category;

  return (
    <div className="wd-category-page">
      <h2 className="wd-title">{title.toUpperCase()}</h2>
      <div className="wd-items">
        {items.map((item) => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
