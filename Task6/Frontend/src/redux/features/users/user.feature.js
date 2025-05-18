import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username || "";
      state.email = action.payload.email || "";
    },
    clearUser: (state) => {
      state.username = "";
      state.email = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
