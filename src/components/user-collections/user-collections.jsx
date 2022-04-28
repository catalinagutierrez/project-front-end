import React, { useState, useEffect } from "react";

import FollowingPreview from "../../components/following-preview/following-preview";
import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";

import { getPetDetails } from "../../redux/pet-data/pet-data.actions";
import UserService from "../../services/user-service";

const UserCollections = ({ user }) => {
  const [likedItems, setLikedItems] = useState([]);
  const [adoptedItems, setAdoptedItems] = useState([]);
  const [postedItems, setPostedItems] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

  const fetchPet = async (id) => {
    const response = await getPetDetails(id);
    return response;
  };

  const fetchUser = async (id) => {
    const response = await UserService.findUserById(id);
    return response;
  };

  useEffect(() => {
    if (user) {
      if (user.type === "buyer") {
        // load liked items
        user.likedItems.forEach(async (id) => {
          const item = await fetchPet(id);
          if (item) {
            setLikedItems((likedItems) => [...likedItems, item]);
          }
        });
        // load adopted items
        user.adoptedItems.forEach(async (id) => {
          const item = await fetchPet(id);
          if (item) {
            setAdoptedItems((adoptedItems) => [...adoptedItems, item]);
          }
        });
        //load followed users
        user.following.forEach(async (id) => {
          const item = await fetchUser(id);
          if (item) {
            setFollowedUsers((followedUsers) => [...followedUsers, item]);
          }
        });
      }

      if (user.type === "seller") {
        // load posted items
        user.postedItems.forEach(async (id) => {
          const item = await fetchPet(id);
          if (item) {
            setPostedItems((postedItems) => [...postedItems, item]);
          }
        });
      }
    }
  }, [user]);

  return (
    <div>
      <UserInformation user={user} />
      {user.type === "seller" && (
        <CategoryPreview
          items={postedItems}
          title={"pets for adoption"}
          route={"posted"}
          customAltText="You haven't placed any pets for adoption."
        />
      )}
      {user.type === "buyer" && (
        <div>
          <CategoryPreview
            items={likedItems}
            title={"likes"}
            route={"likes"}
            customAltText="You don't have any saved pets yet."
          />
          <FollowingPreview
            users={followedUsers}
            title={"following"}
            route={"following"}
          />
          <CategoryPreview
            items={adoptedItems}
            title={"Pets you applied for"}
            customAltText="You haven't placed any pets for adoption."
          />
        </div>
      )}
    </div>
  );
};

export default UserCollections;
