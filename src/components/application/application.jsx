import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { clearCart } from "../../redux/cart/cart.actions";

import "./application.styles.scss";

const Application = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appData, setAppData] = useState({
    fullName: "",
    zipCode: "",
    currentPets: "none",
    previousPets: "none",
    hasChildren: "no",
    errors: {},
  });
  const [error, setError] = useState({});

  const { fullName, zipCode, currentPets, previousPets, hasChildren } = appData;

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!fullName) {
      isValid = false;
      errors["fullName"] = "Please enter your full name.";
    }

    if (typeof fullName !== "undefined") {
      if (fullName.length > 50) {
        isValid = false;
        errors["fullName"] = "Name cannot exceed 50 characters.";
      }
    }

    if (!zipCode) {
      isValid = false;
      errors["zipCode"] = "Please enter your zip code.";
    }

    if (typeof zipCode !== "undefined") {
      var pattern = new RegExp("[0-9]");
      if (!pattern.test(zipCode) || zipCode.length > 5) {
        isValid = false;
        errors["zipCode"] = "Please enter a valid zip code.";
      }
    }

    setError(errors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      alert(
        "We have receieved your application and will get back to you soon. Thank you!"
      );
      dispatch(clearCart());
      navigate("/home");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAppData({ ...appData, [name]: value });
  };

  return (
    <div className="wd-application">
      <h2 className="wd-application-title">Application details</h2>
      <span>
        This is a preliminary application. Your details will be sent to the pet
        owner and they will connect with you through your account email with
        next steps.
      </span>
      <form className="application-form" onSubmit={() => handleSubmit()}>
        <FormInput
          type="text"
          name="fullName"
          value={fullName}
          onChange={handleChange}
          label="Full Name"
          error={error.fullName}
        />
        <FormInput
          type="text"
          name="zipCode"
          value={zipCode}
          onChange={handleChange}
          label="Zip Code"
          error={error.zipCode}
        />
        <div className="wd-radio-button-input">
          <label>
            Do you currently have other pets in your household? <br />
          </label>
          <div>
            <input
              type="radio"
              name="currentPets"
              value="none"
              onChange={handleChange}
              checked={currentPets === "none"}
            />
            <label>Not yet...</label>
          </div>
          <div>
            <input
              type="radio"
              name="currentPets"
              value="dogs"
              onChange={handleChange}
              checked={currentPets === "dogs"}
            />
            <label>I have one or more dogs</label>
          </div>
          <div>
            <input
              type="radio"
              name="currentPets"
              value="cats"
              onChange={handleChange}
              checked={currentPets === "cats"}
            />
            <label>I have one or more cats</label>
          </div>
          <div>
            <input
              type="radio"
              name="currentPets"
              value="both"
              onChange={handleChange}
              checked={currentPets === "both"}
            />
            <label>Both!</label>
          </div>
        </div>
        <div className="wd-radio-button-input">
          <label>
            Have you had pets in your household before? <br />
          </label>
          <div>
            <input
              type="radio"
              name="previousPets"
              value="none"
              onChange={handleChange}
              checked={previousPets === "none"}
            />
            <label>Nope</label>
          </div>
          <div>
            <input
              type="radio"
              name="previousPets"
              value="dogs"
              onChange={handleChange}
              checked={previousPets === "dogs"}
            />
            <label>I've had dogs</label>
          </div>
          <div>
            <input
              type="radio"
              name="previousPets"
              value="cats"
              onChange={handleChange}
              checked={previousPets === "cats"}
            />
            <label>I've had cats</label>
          </div>
          <div>
            <input
              type="radio"
              name="previousPets"
              value="both"
              onChange={handleChange}
              checked={previousPets === "both"}
            />
            <label>I've had both!</label>
          </div>
        </div>
        <div className="wd-radio-button-input">
          <label>
            Does your family have any children under 5? <br />
          </label>
          <div>
            <input
              type="radio"
              name="hasChildren"
              value="yes"
              onChange={handleChange}
              checked={hasChildren === "yes"}
            />
            <label>Yes</label>
          </div>
          <div>
            <input
              type="radio"
              name="hasChildren"
              value="no"
              onChange={handleChange}
              checked={hasChildren === "no"}
            />
            <label>No</label>
          </div>
        </div>
        <Button onClick={handleSubmit}>SUBMIT APPLICATION</Button>
      </form>
    </div>
  );
};

export default Application;
