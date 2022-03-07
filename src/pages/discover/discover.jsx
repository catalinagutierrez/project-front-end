import React from "react";
import { Route, Routes } from "react-router-dom";

import CategoryOverview from "../../components/category-overview/category-overview";
import CategoryPage from "../category/category";

const DiscoverPage = () => {
  return (
    <div className="wd-discover-page">
      <Routes>
        <Route path="" element={<CategoryOverview />} />
        <Route path="/:categoryUrlName" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default DiscoverPage;
