import React from "react";
import { useNavigate } from "react-router-dom";

import FollowingItem from "../following-item/following-item";

import "./following-preview.styles.scss";

const FollowingPreview = ({ title, users }) => {
  let navigate = useNavigate();
  console.log(users);

  return (
    <div>
      {users.length === 0 ? (
        <div>
          <h1>{title.toUpperCase()}</h1>
          "Looks like you are not following any users at the moment."
        </div>
      ) : (
        <div className="wd-following-preview">
          <h1
            className="wd-title"
            //maybe navigate to page that displays all
            // onClick={() => {
            //   navigate(`/profile?id=${user.contact.userId}}`, {replace: true});
            // }}
          >
            {title.toUpperCase()}
          </h1>
          <div className="wd-preview">
            {users.slice(0, 4).map((user) => (
              <FollowingItem key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowingPreview;
