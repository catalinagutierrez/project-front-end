import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryPreview from "../../components/category-preview/category-preview";
import { selectCategoryItems } from "../../redux/categories/categories.selectors";

import "./categories.styles.scss";

const CategoriesPage = ({ categories }) => {
  return (
    <div className="wd-category-page">
      {categories.map(({ id, ...otherCategoryProps }) => (
        <CategoryPreview key={id} {...otherCategoryProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategoryItems,
});

export default connect(mapStateToProps)(CategoriesPage);
