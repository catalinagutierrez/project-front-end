import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import UserService from "../../services/user-service";
import UserCollections from "../../components/user-collections/user-collections";
import UserInformation from "../../components/user-information/user-information";

const ProfilePage = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [params] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
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
      loadUser();
    } else {
      navigate("/login", { replace: true });
    }
  }, [params, currentUser, navigate]);

  return (
    <div className="wd-profile">
      {loading ? (
        <div>Loading...</div>
      ) : (
        user && (
          <div>
            <UserInformation user={user} />
            <UserCollections user={user} />
          </div>
        )
      )}
    </div>
  );
};

export default ProfilePage;
