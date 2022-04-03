import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Button from "../button/button";
import FormInput from "../form-input/form-input";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./user-information.styles.scss";

const UserInformation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [editable, setEditable] = useState(false);
  const [userCredentials, setCredentials] = useState(currentUser);
  const [error, setError] = useState({});
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

    setError(errors);
    console.log(error);

    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setCredentials({ ...userCredentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      dispatch(setCurrentUser(userCredentials));
      setEditable(false);
    }
  };

  if (!editable) {
    return (
      <div className="wd-user-information">
        <img
          src={require(`../../assets/user1.png`)}
          alt="user"
          className="wd-user-img"
        />
        <div className="wd-user-details">
          <h1 className="wd-profile-title">{displayName}</h1>
          <div className="wd-profile-body">
            <div className="wd-user-information-item">Email: {email}</div>
            <Button onClick={() => setEditable(true)}>Edit</Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="wd-user-information">
        <img
          src={require(`../../assets/user1.png`)}
          alt="user"
          className="wd-user-img"
        />
        <div className="wd-user-details">
          <form className="wd-edit-user-form" onSubmit={handleSubmit}>
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
            <div className="wd-buttons-bar">
              <Button type="submit">SAVE</Button>
              <Button
                onClick={() => {
                  setEditable(false);
                  setError({});
                  setCredentials(currentUser);
                }}
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default UserInformation;
