import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/home";
import CollectionPage from "./pages/collection/collection";
import Header from "./components/header/header";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/home" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
        <Route path="/signin" element={<SignInAndSignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
