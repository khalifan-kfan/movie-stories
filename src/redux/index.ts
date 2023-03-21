import { combineReducers } from '@reduxjs/toolkit';
import { moviesListSlice } from './Slices/movies';
const rootReducer = combineReducers({ [moviesListSlice.name]: moviesListSlice.reducer, })
export default rootReducer
