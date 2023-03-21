import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export const moviesListSlice = createSlice({
  name: "movies",
  initialState: {
    searchTerm: "",
    moviesTotal: 0,
    currentPage: 1,
    searchResults: [],
  },
  reducers: {
    setSearchLists: (state, action) => {
      state.searchTerm = action.payload.searchTerm;
      state.moviesTotal = action.payload.moviesTotal;
      state.currentPage = action.payload.currentPage;
      state.searchResults = action.payload.searchResults;
    },
    resetMovies: (state, action) => {
      state.searchTerm = "";
      state.moviesTotal = 0;
      state.currentPage = 0;
      state.searchResults = [];
    },
  },
});

export const { setSearchLists, resetMovies } = moviesListSlice.actions;

export default moviesListSlice.reducer;

export const selectTodos = (state: RootState) => state;
