import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    userDetails:null,
    token: null,
    Emails:null,
    DriverEmails:null,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state, action) => {
      state.user = action.payload;
    },
    addToken: (state, action) => {
      state.token = action.payload;
    },
    addEmail: (state, action) => {
      state.Emails = action.payload;
    },
    addUserDetails: (state, action) => {
      state.Emails = action.payload;
    },
    addDriverEmails: (state, action) => {
      state.DriverEmails = action.payload;
    },
  },
});

export const { login, logout ,addToken , addEmail,addDriverEmails} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const selectEmails= (state) => state.user.Emails;
export const selectDriverEmails= (state) => state.user.Emails;

export default userSlice.reducer;