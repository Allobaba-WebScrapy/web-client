import { createSlice } from "@reduxjs/toolkit";

// Interface
interface AuthState {
  isLogin: boolean;
  code: string;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
  code: import.meta.env.VITE_CODE || "123456",
};

// Create slice
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
      localStorage.setItem("user", JSON.stringify({ isLogin: true }));
    },
    logout: (state) => {
      state.isLogin = false;
      localStorage.clear();
    },
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
