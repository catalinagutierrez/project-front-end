import React from "react";
import { useNavigate } from "react-router-dom";

import "./following-item.styles.scss";

const FollowingItem = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div
      className="wd-following-item"
      onClick={() => {
        navigate(`/profile?id=${user._id}`, { replace: true });
      }}
    >
      <div
        className="wd-following-image"
        style={{
          backgroundImage: `url(${user.photo})`,
        }}
      />
      <div className="wd-following-footer">
        <span className="wd-name">{user.name}</span>
      </div>
    </div>
  );
};

export default FollowingItem;
