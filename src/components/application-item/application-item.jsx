import React from "react";
import { useDispatch } from "react-redux";

import { removeItem } from "../../redux/cart/cart.actions";

import "./application-item.styles.scss";

const ApplicationItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, imageUrl } = item;

  return (
    <div className="wd-application-item">
      <div className="wd-application-image">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="wd-application-text">{name}</span>
      <div
        className="wd-remove-button"
        onClick={() => dispatch(removeItem(item))}
      >
        &#10005;
      </div>
    </div>
  );
};

export default ApplicationItem;
