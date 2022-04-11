import React from "react";
import { useSelector } from "react-redux";

import Directory from "../../components/directory/directory";
import CategoryPreview from "../../components/category-preview/category-preview";

import "./home.styles.scss";

const HomePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="wd-home">
      <Directory />
      {currentUser ? (
        <CategoryPreview
          items={currentUser.likedItems}
          title={"Pick up where you left off..."}
          routeName={"profile"}
          customAltText="You don't have any saved pets yet."
        />
      ) : (
        <div>Anonymous user</div>
      )}
    </div>
  );
};

export default HomePage;
