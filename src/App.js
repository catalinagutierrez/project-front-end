import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import HomePage from "./pages/home/home";
import DiscoverPage from "./pages/discover/discover";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import ApplicationPage from "./pages/application/application";
import ProfilePage from "./pages/profile/profile";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/discover/*" element={<DiscoverPage />} />
        <Route path="/signin" element={<SignInAndSignUpPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(App);
