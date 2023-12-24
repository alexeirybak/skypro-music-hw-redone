import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "./reducers/reducers";

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
  },
});
