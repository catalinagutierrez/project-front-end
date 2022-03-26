import React from "react";
import { useSelector } from "react-redux";
import MenuItem from "../menu-item/menu-item";

import "./directory.styles.scss";

const Directory = () => {
  const categories = useSelector((state) => state.directory.categories);

  return (
    <div className="directory-menu">
      {categories.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

export default Directory;
