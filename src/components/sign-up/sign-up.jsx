import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = ({ setCurrentUser }) => {
  let navigate = useNavigate();
  const [error, setError] = useState({});
  const [userCredentials, setCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const { displayName, email, password, confirmPassword, type } =
    userCredentials;

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!displayName) {
      isValid = false;
      errors["displayName"] = "Please enter your name.";
    }

    if (typeof displayName !== "undefined") {
      if (displayName.length > 20) {
        isValid = false;
        errors["displayName"] = "Name cannot exceed 20 characters.";
      }
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!password) {
      isValid = false;
      errors["password"] = "Please enter a password.";
    }

    if (typeof password !== "undefined") {
      if (password.length < 6) {
        isValid = false;
        errors["password"] = "Password must have at least 6 characters";
      }
    }

    if (!confirmPassword) {
      isValid = false;
      errors["confirmPassword"] = "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      isValid = false;
      errors["confirmPassword"] = "Passwords don't match.";
      errors["password"] = "Passwords don't match.";
    }

    if (type === "") {
      isValid = false;
      errors["type"] = "Please select an account type.";
    }

    setError(errors);
    console.log(error);

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      setCurrentUser(userCredentials);
      navigate("/home");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="wd-sign-up">
      <h2>I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Display Name"
          error={error.displayName}
        />
        <FormInput
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          label="Email"
          error={error.email}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Password"
          error={error.password}
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Confirm Password"
          error={error.confirmPassword}
        />
        <FormInput
          type="radio"
          name="type"
          value="buyer"
          label="I'm looking to adopt!"
          onChange={handleChange}
          error={error.type}
        />
        <FormInput
          type="radio"
          name="type"
          value="seller"
          label="I want to put up for adoption!"
          onChange={handleChange}
          error={error.type}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignUp);
