import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user.feature";

export default configureStore({
  reducer: {
    user: userReducer,
  },
});
