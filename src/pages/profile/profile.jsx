import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { getPetDetails } from "../../redux/pet-data/pet-data.actions";

import UserInformation from "../../components/user-information/user-information";
import CategoryPreview from "../../components/category-preview/category-preview";
import UserService from "../../services/user-service";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [params] = useSearchParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState([]);
  const [adoptedItems, setAdoptedItems] = useState([]);
  const [postedItems, setPostedItems] = useState([]);

  const fetchPet = async (id) => {
    const response = await getPetDetails(id);
    return response;
  };

  const loadUser = async () => {
    try {
      if (params.get("id")) {
        const response = await UserService.findUserById(params.get("id"));
        setUser(response);
      } else {
        setUser(currentUser);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
      console.log(user);
    }
  };

  useEffect(() => {
    loadUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="wd-profile">
      {loading ? (
        <div>Loading...</div>
      ) : (
        user && (
          <div>
            <UserInformation user={user} />
            {user.type === "seller" && (
              <CategoryPreview
                items={postedItems}
                title={"pets for adoption"}
                routeName={"profile"}
                customAltText="You haven't placed any pets for adoption."
              />
            )}
            {user.type === "buyer" && (
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
        )
      )}
    </div>
  );
};

export default ProfilePage;
