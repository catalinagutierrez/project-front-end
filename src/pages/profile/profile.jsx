import React from "react";
import { useSelector } from "react-redux";

import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";

const ProfilePage = () => {
  const petData = useSelector((state) => state.petData.data);
  const likedItems = useSelector((state) => state.user.currentUser.likedItems);
  console.log(likedItems);
  return (
    <div className="wd-profile">
      <UserInformation />
      <CategoryPreview
        items={likedItems}
        title={"saved pets"}
        routeName={"profile"}
      />
    </div>
  );
};

export default ProfilePage;
