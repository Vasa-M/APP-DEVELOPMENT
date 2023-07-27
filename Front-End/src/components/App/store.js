import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../Features/features";

export default configureStore({
  reducer: {
    user: useReducer,
  },
});