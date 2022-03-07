import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CategoryPreview from "../category-preview/category-preview";
import { selectCategoryItems } from "../../redux/categories/categories.selectors";

import "./category-overview.styles.scss";

const CategoryOverview = ({ categories }) => (
  <div className="wd-category-overview">
    {categories.map(({ id, ...otherCategoryProps }) => (
      <CategoryPreview key={id} {...otherCategoryProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  categories: selectCategoryItems,
});

export default connect(mapStateToProps)(CategoryOverview);
