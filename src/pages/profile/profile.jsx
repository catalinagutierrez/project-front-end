import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getPetDetails } from "../../redux/pet-data/pet-data.actions";

import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [likedItems, setLikedItems] = useState([]);
  const [adoptedItems, setAdoptedItems] = useState([]);
  const [postedItems, setPostedItems] = useState([]);

  useEffect(() => {
    const fetch = async (id) => {
      const response = await getPetDetails(id);
      return response;
    };

    if (currentUser.type === "buyer") {
      // load liked items
      currentUser.likedItems.forEach(async (id) => {
        const item = await fetch(id);
        if (item) {
          setLikedItems((likedItems) => [...likedItems, item]);
        }
      });
      // load adopted items
      currentUser.adoptedItems.forEach(async (id) => {
        const item = await fetch(id);
        if (item) {
          setAdoptedItems((adoptedItems) => [...adoptedItems, item]);
        }
      });
    }

    if (currentUser.type === "seller") {
      // load posted items
      currentUser.postedItems.forEach(async (id) => {
        const item = await fetch(id);
        if (item) {
          setPostedItems((postedItems) => [...postedItems, item]);
        }
      });
    }
  }, []);

  return (
    <div className="wd-profile">
      <UserInformation />
      {currentUser.type === "seller" && (
        <CategoryPreview
          items={postedItems}
          title={"placed for adoption"}
          routeName={"profile"}
          customAltText="You haven't placed any pets for adoption."
        />
      )}
      {currentUser.type === "buyer" && (
        <div>
          <CategoryPreview
            items={likedItems}
            title={"saved pets"}
            routeName={"profile"}
            customAltText="You don't have any saved pets yet."
          />
          <CategoryPreview
            items={adoptedItems}
            title={"Previously adopted pets"}
            routeName={"profile"}
            customAltText="You haven't placed any pets for adoption."
          />
          Following profiles
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
