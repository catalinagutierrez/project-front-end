import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getPetDetails } from "../../redux/pet-data/pet-data.actions";

import Directory from "../../components/directory/directory";
import CategoryPreview from "../../components/category-preview/category-preview";

import "./home.styles.scss";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const fetch = async (id) => {
      const response = await getPetDetails(id);
      return response;
    };

    if (currentUser && currentUser.type !== "admin") {
      // load liked items
      currentUser.likedItems.forEach(async (id) => {
        const item = await fetch(id);
        if (item) {
          setLikedItems((likedItems) => [...likedItems, item]);
        }
      });
    }
  }, []);

  return (
    <div className="wd-home">
      <Directory />
      {currentUser ? (
        currentUser.type === "admin" ? (
          <div>Admin account</div>
        ) : (
          <CategoryPreview
            items={likedItems}
            title={"Pick up where you left off..."}
            routeName={"profile"}
            customAltText="You don't have any saved pets yet."
          />
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HomePage;
