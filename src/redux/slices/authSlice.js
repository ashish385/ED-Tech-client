import { createSlice } from "@reduxjs/toolkit";

// const userData = JSON.parse(localStorage.getItem("Ed_token"));
const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("Ed_token") ? JSON.parse(localStorage.getItem("Ed_token")) : null,
  // token:userData
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
      setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
    }
})

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer