import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../button/button";
import { addItem } from "../../redux/cart/cart.actions";

import { selectCurrentUser } from "../../redux/user/users.selectors";

import "./category-item.styles.scss";

const CategoryItem = ({ item, addItem, currentUser }) => {
  const navigate = useNavigate();
  const { imageUrl, name, age } = item;

  return (
    <div className="wd-category-item">
      <div
        className="wd-category-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="wd-category-footer">
        <span className="wd-name">{name}</span>
        <span className="wd-age">{age}</span>
      </div>
      <Button
        inverted
        onClick={() => {
          currentUser ? addItem(item) : navigate("/signin", { replace: true });
        }}
      >
        {currentUser ? "ADOPT" : "SIGN IN TO ADOPT"}
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
