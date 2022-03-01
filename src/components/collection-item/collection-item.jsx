import React from "react";

import "./collection-item.styles.scss";

const CollectionItem = ({ id, name, age, imageUrl }) => (
  <div className="wd-collection-item">
    <div
      className="wd-image"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    />
    <div className="wd-collection-footer">
      <span className="wd-name">{name}</span>
      <span className="wd-price">{age}</span>
    </div>
  </div>
);

export default CollectionItem;
