import React from "react";
import { useSelector } from "react-redux";

import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";

const ProfilePage = () => {
  const petData = useSelector((state) => state.petData.data);
  const category = petData.find((category) => category.title === "kittens");
  const { items } = category;
  console.log(items);

  return (
    <div className="wd-profile">
      <UserInformation />
      <CategoryPreview
        items={items}
        title={"Pick up where you left off..."}
        routeName={"profile"}
      />
    </div>
  );
};

export default ProfilePage;
