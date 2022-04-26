import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { storage } from "../../firebase.utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

import Button from "../button/button";
import FormInput from "../form-input/form-input";

import { updateUser } from "../../redux/user/user.actions";

import "./user-information.styles.scss";

const UserInformation = ({ user }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [edit, setEdit] = useState(false);
  const [userCredentials, setUserCredentials] = useState(user);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [error, setError] = useState({});
  const [photo, setPhoto] = useState(null);
  const { name, email, phone, password } = userCredentials;

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

    setError(errors);

    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setUserCredentials({ ...userCredentials, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (photo) {
        const uuid = v4();
        const imageRef = ref(storage, `user_images/${uuid}`);
        uploadBytes(imageRef, photo).then((res) => {
          getDownloadURL(imageRef).then((res) => {
            updateUser(dispatch, { ...userCredentials, photo: res });
            setEdit(false);
          });
        });
      } else {
        setUserCredentials({ ...userCredentials });
        updateUser(dispatch, userCredentials);
        setEdit(false);
      }
    }
  };

  const fileHandler = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div>
      {edit ? (
        <div className="wd-user-information">
          <div className="wd-user-details">
            <form className="wd-edit-user-form" onSubmit={handleSubmit}>
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
                label="New Password"
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
              <input
                className="wd-user-img-input"
                type="file"
                multiple
                onChange={(event) => fileHandler(event)}
              />
              <div className="wd-buttons-bar">
                <Button type="submit">SAVE</Button>
                <Button
                  onClick={() => {
                    setEdit(false);
                    setError({});
                    setUserCredentials(currentUser);
                  }}
                >
                  CANCEL
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="wd-user-information">
          <img src={currentUser.photo} alt="user" className="wd-user-img" />
          <div className="wd-user-details">
            <h1>{name}</h1>
            <div className="wd-profile-body">
              <div className="wd-user-information-item">Email: {email}</div>
              <div className="wd-user-information-item">Phone: {phone}</div>
            </div>
            {currentUser._id === user._id && (
              <Button onClick={() => setEdit(true)}>Edit</Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInformation;
