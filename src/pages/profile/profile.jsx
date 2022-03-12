import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import UserInformation from "../../components/user-information/user-information";
import CategoryItem from "../../components/category-item/category-item";

import { selectCategoryItems } from "../../redux/categories/categories.selectors";

const ProfilePage = ({ categories }) => {
  const category = categories.find(
    (category) => category.routeName === "kittens"
  );
  const { items } = category;
  console.log(items);

  return (
    <div className="wd-profile">
      <UserInformation />
      <div>
        <h2>Pick up where you left off...</h2>
        <div className="wd-profile-preview-items">
          {items
            .filter((item, idx) => idx < 4)
            .map((item) => (
              <CategoryItem key={item.id} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  categories: selectCategoryItems,
});

export default connect(mapStateToProps)(ProfilePage);
