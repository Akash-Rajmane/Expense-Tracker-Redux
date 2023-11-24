import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  email: null,
  isLoggedIn: false
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        login: (state,action) => {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isLoggedIn = true;
        },

        logout: (state) => {
            localStorage.removeItem("user");
            state.token = null;
            state.email = null;
            state.isLoggedIn = false;
        }
    }
});


export const { login, logout } = authSlice.actions;

export default authSlice.reducer;