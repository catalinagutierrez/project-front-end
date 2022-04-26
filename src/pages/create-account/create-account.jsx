import React from "react";

import SignUp from "../../components/sign-up/sign-up";

const CreateAccountPage = () => {
  return (
    <div className="wd-sign-in-and-sign-up">
      <SignUp adminSignUp={true} />
    </div>
  );
};

export default CreateAccountPage;
