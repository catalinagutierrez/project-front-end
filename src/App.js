import React from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/home/home";
import DiscoverPage from "./pages/discover/discover";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import ApplicationPage from "./pages/application/application";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/discover/*" element={<DiscoverPage />} />
        <Route path="/signin" element={<SignInAndSignUpPage />} />
        <Route path="/application" element={<ApplicationPage />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(App);
