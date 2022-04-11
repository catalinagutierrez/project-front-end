import React from "react";
import { useSelector } from "react-redux";

import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <div className="wd-profile">
      <UserInformation />
      <CategoryPreview
        items={currentUser.likedItems}
        title={"saved pets"}
        routeName={"profile"}
        customAltText="You don't have any saved pets yet."
      />
      {currentUser.type === "seller" && (
        <CategoryPreview
          items={currentUser.postedItems}
          title={"placed for adoption"}
          routeName={"profile"}
          customAltText="You haven't placed any pets for adoption."
        />
      )}
      {currentUser.type === "buyer" && <div>Following profiles</div>}
    </div>
  );
};

export default ProfilePage;
