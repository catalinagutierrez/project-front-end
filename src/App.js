import React, { useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPetData } from "./redux/pet-data/pet-data.actions";

import HomePage from "./pages/home/home";
import DiscoverPage from "./pages/discover/discover";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";
import ApplicationPage from "./pages/application/application";
import ProfilePage from "./pages/profile/profile";
import NotFoundPage from "./pages/not-found/not-found";
import ItemDetailsPage from "./pages/item-details/item-details";
import PlaceForAdoptionPage from "./pages/place-for-adoption/place-for-adoption";
import SearchPage from "./pages/search/search";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    for (let attempts = 0; attempts < 3; attempts++) {
      try {
        await getPetData(dispatch);
        break;
      } catch (error) {
        console.log(error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/discover/*" element={<DiscoverPage />} />
        <Route path="/login" element={<SignInAndSignUpPage />} />
        <Route path="/application" element={<ApplicationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/details/*" element={<ItemDetailsPage />} />
        <Route path="/add" element={<PlaceForAdoptionPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
