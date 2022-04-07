import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import PetInformation from "../../components/pet-information/pet-information";

const ItemDetailsPage = () => {
  const [params] = useSearchParams();
  const data = useSelector((state) => state.petData.data);

  const category = data.find(
    (category) => category.title === params.get("category")
  );

  const item = category.items.find(
    (item) => item.id === parseInt(params.get("id"))
  );

  return (
    <div>
      {item ? (
        <div className="wd-category-page">
          <PetInformation item={item} />
        </div>
      ) : (
        <div>
          There was a problem loading this page. Please try again later.
        </div>
      )}
    </div>
  );
};

export default ItemDetailsPage;
