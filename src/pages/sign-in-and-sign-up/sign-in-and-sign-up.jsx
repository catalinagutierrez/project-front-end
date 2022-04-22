import React from "react";

import SignIn from "../../components/sign-in/sign-in";
import SignUp from "../../components/sign-up/sign-up";

import "./sign-in-and-sign-up.styles.scss";

const SignInAndSignUpPage = () => (
  <div className="wd-sign-in-and-sign-up">
    <SignIn admin={false} />
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
