import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loaderReducer from './loaderSlice';  // Import the loaderSlice reducer

const store = configureStore({
  reducer: {
    users: usersReducer,
     loader: loaderReducer
  },
});

export default store;
