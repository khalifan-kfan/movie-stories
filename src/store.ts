import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux";

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
