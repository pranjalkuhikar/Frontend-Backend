import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/user.feature";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
