import React, { useState } from "react";
import { useSelector } from "react-redux";

import ApplicationItem from "../../components/application-item/application-item";
import Button from "../../components/button/button";
import Application from "../../components/application/application";

import "./application.styles.scss";

const ApplicationPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showForm, setShowForm] = useState(false);
  const [showApplyButton, setShowApplyButton] = useState(true);

  return (
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
      {cartItems.length > 0 ? (
        showApplyButton && (
          <Button
            onClick={() => {
              setShowForm(true);
              setShowApplyButton(false);
            }}
          >
            {" "}
            Apply
          </Button>
        )
      ) : (
        <p>Please select a pet to adopt before filling out the application.</p>
      )}
      {showForm && <Application />}
    </div>
  );
};

export default ApplicationPage;
