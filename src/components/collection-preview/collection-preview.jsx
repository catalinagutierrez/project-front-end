import React from "react";

import CollectionItem from "../collection-item/collection-item";

import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, items }) => (
  <div className="wd-collection-preview">
    <h1 className="wd-title">{title.toUpperCase()}</h1>
    <div className="wd-preview">
      {items
        .filter((item, idx) => idx < 4)
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
