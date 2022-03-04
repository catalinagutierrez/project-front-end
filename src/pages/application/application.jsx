import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCartItems } from "../../redux/cart/cart.selectors";

import ApplicationItem from "../../components/application-item/application-item";
import Button from "../../components/button/button";
// import Application from "../../components/application/application";

import "./application.styles.scss";

const ApplicationPage = ({ cartItems }) => (
  <div className="wd-application-page">
    <div className="wd-application-header">
      <div className="wd-header-block">
        <span>Pet</span>
      </div>
      <div className="wd-header-block">
        <span>Name</span>
      </div>
      <div className="wd-header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <ApplicationItem key={cartItem.id} item={cartItem} />
    ))}
    {cartItems.length ? (
      <Button
        onClick={() =>
          this.setState({
            showForm: true,
            showApplyButton: false,
          })
        }
      >
        {" "}
        Apply
      </Button>
    ) : (
      <p>Please select a pet to adopt before filling out the application.</p>
    )}
    {/* {this.state.showForm && cartItems.length !== 0 && (
      <Application />
    )} */}
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default connect(mapStateToProps)(ApplicationPage);
