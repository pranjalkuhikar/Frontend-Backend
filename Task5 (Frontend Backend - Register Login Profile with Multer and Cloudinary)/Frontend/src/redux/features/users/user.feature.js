import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    profilePhoto: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || "";
      state.email = action.payload.email || "";
      state.profilePhoto = action.payload.profilePhoto || "";
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
