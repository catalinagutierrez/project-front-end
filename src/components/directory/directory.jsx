import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectoryCategories } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item";

import "./directory.styles.scss";

const Directory = ({ categories }) => (
  <div className="directory-menu">
    {categories.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  categories: selectDirectoryCategories,
});

export default connect(mapStateToProps)(Directory);
