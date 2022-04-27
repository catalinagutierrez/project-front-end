import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import CategoryItem from "../../components/category-item/category-item";
import FollowingItem from "../../components/following-item/following-item";
import { getPetDetails } from "../../redux/pet-data/pet-data.actions";
import UserService from "../../services/user-service";

import "./user-collection.styles.scss";

const UserCollectionPage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [items, setItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const pageType = /[^/]*$/.exec(location.pathname)[0];

  const fetchPet = async (id) => {
    const response = await getPetDetails(id);
    return response;
  };

  const fetchUser = async (id) => {
    const response = await UserService.findUserById(id);
    return response;
  };

  useEffect(() => {
    if (pageType === "likes") {
      // load liked items
      currentUser.likedItems.forEach(async (id) => {
        const item = await fetchPet(id);
        if (item) {
          setItems((items) => [...items, item]);
        }
      });
    }

    if (pageType === "posted") {
      // load posted items
      currentUser.postedItems.forEach(async (id) => {
        const item = await fetchPet(id);
        if (item) {
          setItems((items) => [...items, item]);
        }
      });
    }

    if (pageType === "following") {
      //load followed users
      currentUser.following.forEach(async (id) => {
        const item = await fetchUser(id);
        if (item) {
          setItems((items) => [...items, item]);
        }
      });
    }
  }, [
    pageType,
    currentUser.following,
    currentUser.likedItems,
    currentUser.postedItems,
  ]);

  return (
    <div>
      <h2 onClick={() => navigate(-1)}>Back</h2>
      <div className="wd-category-page">
        <h2 className="wd-title">{pageType.toUpperCase()}</h2>
        {items.length === 0 ? (
          <div>
            Looks like there are not pets available at the moment. Please come
            back soon!
          </div>
        ) : pageType !== "following" ? (
          <div className="wd-items">
            {items.map((item) => (
              <CategoryItem key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="wd-items">
            {items.map((item) => (
              <FollowingItem key={item._id} user={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCollectionPage;
