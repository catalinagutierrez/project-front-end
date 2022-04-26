import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserService from "../../services/user-service";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { signUp } from "../../redux/user/user.actions";

import "./sign-up.styles.scss";

const SignUp = ({ adminSignUp }) => {
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
    //default photo to the anonymous user photo
    photo:
      "https://firebasestorage.googleapis.com/v0/b/cat-animal-rescue-db.appspot.com/o/user.png?alt=media&token=32127a6e-46cc-4606-8d49-12562c79e55d",
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validate()) {
      if (adminSignUp) {
        const existingUser = await UserService.findUserByEmail(
          userCredentials.email
        );
        if (!existingUser) {
          await UserService.createUser(userCredentials);
          navigate("/home");
        } else {
          let errors = { email: "Email already in use." };
          setError(errors);
        }
      } else {
        try {
          await signUp(dispatch, userCredentials);
          navigate("/home");
        } catch (error) {
          let errors = { email: "Email already in use." };
          setError(errors);
        }
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="wd-sign-up">
      {adminSignUp ? (
        <div>
          <h2 className="wd-sign-up-title">Manually create account</h2>
        </div>
      ) : (
        <div>
          <h2 className="wd-sign-up-title">I do not have a account</h2>
          <span className="wd-sign-up-span">
            Sign up with your email and password
          </span>
        </div>
      )}
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
        {adminSignUp ? (
          <div className="wd-radio-buttons-row">
            <div>
              <input
                type="radio"
                name="type"
                value="buyer"
                onChange={handleChange}
                error={error.type}
              />
              Buyer
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="seller"
                onChange={handleChange}
                error={error.type}
              />
              Seller
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="admin"
                onChange={handleChange}
                error={error.type}
              />
              Admin
            </div>
          </div>
        ) : (
          <div className="wd-radio-buttons-row">
            <div>
              <input
                type="radio"
                name="type"
                value="buyer"
                onChange={handleChange}
                error={error.type}
              />
              I'm looking to adopt!
            </div>
            <div>
              <input
                type="radio"
                name="type"
                value="seller"
                onChange={handleChange}
                error={error.type}
              />
              I want to put up for adoption!
            </div>
          </div>
        )}
        <div className="wd-warning">{error.type}</div>
        <Button onClick={handleSubmit}>
          {adminSignUp ? "CREATE" : "SIGN UP"}
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
