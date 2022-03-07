import React from "react";
import { connect } from "react-redux";

import Button from "../button/button";
import { addItem } from "../../redux/cart/cart.actions";

import "./category-item.styles.scss";

const CategoryItem = ({ item, addItem }) => {
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
      <Button inverted onClick={() => addItem(item)}>
        ADOPT
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CategoryItem);
