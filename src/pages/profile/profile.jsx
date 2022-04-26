import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import UserService from "../../services/user-service";
import UserCollections from "../../components/user-collections/user-collections";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [params] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [params]);

  return (
    <div className="wd-profile">
      {loading ? (
        <div>Loading...</div>
      ) : (
        user && <UserCollections user={user} />
      )}
    </div>
  );
};

export default ProfilePage;
