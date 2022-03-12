import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CategoryItem from "../../components/category-item/category-item";
import { selectCategoryItems } from "../../redux/categories/categories.selectors";

import "./category.styles.scss";

const CategoryPage = ({ categories }) => {
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

const mapStateToProps = createStructuredSelector({
  categories: selectCategoryItems,
});

export default connect(mapStateToProps)(CategoryPage);
