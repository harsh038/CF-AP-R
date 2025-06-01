import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterPage from "./pages/FilterPage";
import CollegeDetails from "./pages/CollegeDetails";
import CollegeCourseDetails from "./pages/CollegeCourseDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/filter" element={<FilterPage />} />
        <Route
          path="/college/:collegeCourseId"
          element={<CollegeCourseDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
