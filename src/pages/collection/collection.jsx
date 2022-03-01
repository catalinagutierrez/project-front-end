import React from "react";

import CollectionPreview from "../../components/collection-preview/collection-preview";
import collections from "./collections.data";

const CollectionPage = () => {
  return (
    <div className="wd-collection-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

export default CollectionPage;
