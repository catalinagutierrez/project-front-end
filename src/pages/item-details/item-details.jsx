import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import PetInformation from "../../components/pet-information/pet-information";
import { getPetDetails } from "../../redux/pet-data/pet-data.actions";

const ItemDetailsPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const localData = useSelector((state) => state.petData.data);

  useEffect(() => {
    // look for the data in the local db
    const result = localData.find(
      (item) => item.id === parseInt(params.get("id"))
    );

    // if not found, request the info from the API
    if (result !== undefined) {
      setItem(result);
    } else {
      const fetch = async () => {
        const response = await getPetDetails(parseInt(params.get("id")));
        setItem(response);
      };
      fetch();
    }
  }, [localData, params]);

  return (
    <div>
      <h2 onClick={() => navigate(-1)}>Back</h2>
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
