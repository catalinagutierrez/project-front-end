import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import FormInput from "../form-input/form-input";
import Button from "../button/button";

import { setCurrentUser } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ setCurrentUser }) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setCurrentUser(userCredentials);
      setCredentials({ email: "", password: "" });
      navigate("/home");
    } catch (error) {
      setError("Wrong username or password. Please try again.");
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="wd-sign-in">
      <h2 className="wd-sign-in-title">I already have an account</h2>
      <span className="wd-sign-in-span">
        Sign in with your email and password
      </span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          handleChange={handleChange}
          label="email"
          //required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          //required
        />
        <div className="wd-warning">{error}</div>
        <div className="wd-buttons-bar">
          <Button type="submit" value="Submit Form">
            {" "}
            Sign in{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(SignIn);
