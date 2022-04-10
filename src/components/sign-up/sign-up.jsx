import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [error, setError] = useState({});
  const [userCredentials, setCredentials] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    type: "",
  });

  const { name, email, phone, password, confirmPassword, type } =
    userCredentials;

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!name) {
      isValid = false;
      errors["name"] = "Please enter your name.";
    }

    if (typeof name !== "undefined") {
      if (name.length > 20) {
        isValid = false;
        errors["name"] = "Name cannot exceed 20 characters.";
      }
    }

    if (!email) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }

    if (typeof email !== "undefined") {
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!phone) {
      isValid = false;
      errors["phone"] = "Please enter your phone number.";
    }

    if (typeof phone !== "undefined") {
      let pattern = new RegExp(
        /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
      );
      if (!pattern.test(phone)) {
        isValid = false;
        errors["phone"] = "Please enter valid phone number.";
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

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      delete userCredentials.confirmPassword;
      setCurrentUser(dispatch, userCredentials);
      navigate("/home");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="wd-sign-up">
      <h2 className="wd-sign-up-title">I do not have a account</h2>
      <span className="wd-sign-up-span">
        Sign up with your email and password
      </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          label="Name"
          error={error.name}
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
          type="text"
          name="phone"
          value={phone}
          onChange={handleChange}
          label="Phone Number"
          error={error.phone}
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
        <FormInput
          type="radio"
          name="type"
          value="admin"
          label="This is an administrator account"
          onChange={handleChange}
          error={error.type}
        />
        <Button onClick={handleSubmit}>SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
