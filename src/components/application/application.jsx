import React from "react";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import "./application.styles.scss";

class Application extends React.Component {
  constructor() {
    super();

    this.state = {
      fullName: "",
      address: "",
      zipCode: "",
      currentPets: "none",
      previousPets: "none",
      hasChildren: "no",
      errors: {},
    };
  }

  validate() {
    const { fullName, address, zipCode } = this.state;
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

    if (!address) {
      isValid = false;
      errors["address"] = "Please enter your address.";
    }

    if (!zipCode) {
      isValid = false;
      errors["zipCode"] = "Please enter your zip code.";
    }

    if (typeof zipCode !== "undefined") {
      if (zipCode.length > 5) {
        isValid = false;
        errors["zipCode"] = "Please enter a valid zip code.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  handleSubmit = async (event) => {
    if (this.validate()) {
      this.setState({
        fullName: "",
        address: "",
        zipCode: "",
        currentPets: "none",
        previousPets: "none",
        hasChildren: "no",
      });
      alert(
        "We have receieved your application and will get back to you soon. Thank you!"
      );
    } else {
      event.preventDefault();
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { fullName, address, zipCode } = this.state;

    return (
      <div className="wd-application">
        <h2 className="wd-application-title">Application details</h2>
        <span>
          You will receive a decision and next steps to your account email
          within the next business day.
        </span>
        <form className="application-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="fullName"
            value={fullName}
            onChange={this.handleChange}
            label="Full Name"
            error={this.state.errors.fullName}
            //required
          />
          <FormInput
            type="text"
            name="address"
            value={address}
            onChange={this.handleChange}
            label="Address"
            error={this.state.errors.address}
            //required
          />
          <FormInput
            type="text"
            name="zipCode"
            value={zipCode}
            onChange={this.handleChange}
            label="Zip Code"
            error={this.state.errors.zipCode}
            //required
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
                onChange={this.handleChange}
                checked={this.state.currentPets === "none"}
              />
              <label>Not yet...</label>
            </div>
            <div>
              <input
                type="radio"
                name="currentPets"
                value="dogs"
                onChange={this.handleChange}
                checked={this.state.currentPets === "dogs"}
              />
              <label>I have one or more dogs</label>
            </div>
            <div>
              <input
                type="radio"
                name="currentPets"
                value="cats"
                onChange={this.handleChange}
                checked={this.state.currentPets === "cats"}
              />
              <label>I have one or more cats</label>
            </div>
            <div>
              <input
                type="radio"
                name="currentPets"
                value="both"
                onChange={this.handleChange}
                checked={this.state.currentPets === "both"}
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
                onChange={this.handleChange}
                checked={this.state.previousPets === "none"}
              />
              <label>Nope</label>
            </div>
            <div>
              <input
                type="radio"
                name="previousPets"
                value="dogs"
                onChange={this.handleChange}
                checked={this.state.previousPets === "dogs"}
              />
              <label>I've had dogs</label>
            </div>
            <div>
              <input
                type="radio"
                name="previousPets"
                value="cats"
                onChange={this.handleChange}
                checked={this.state.previousPets === "cats"}
              />
              <label>I've had cats</label>
            </div>
            <div>
              <input
                type="radio"
                name="previousPets"
                value="both"
                onChange={this.handleChange}
                checked={this.state.previousPets === "both"}
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
                onChange={this.handleChange}
                checked={this.state.hasChildren === "yes"}
              />
              <label>Yes</label>
            </div>
            <div>
              <input
                type="radio"
                name="hasChildren"
                value="no"
                onChange={this.handleChange}
                checked={this.state.hasChildren === "no"}
              />
              <label>No</label>
            </div>
          </div>
          <Button type="submit">SUBMIT APPLICATION</Button>
        </form>
      </div>
    );
  }
}

export default Application;
