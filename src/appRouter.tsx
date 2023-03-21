import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
    </Routes>
  );
};

export default AppRouter;
