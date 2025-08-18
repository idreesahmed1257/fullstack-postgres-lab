// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User } from "../../utils/interfaces";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuth: Boolean;
  walletBalance: number;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuth: false,
  walletBalance: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state: AuthState, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },

    logout(state: AuthState) {
      Cookies.remove("accessToken");
      state.user = null;
      state.token = null;
      state.isAuth = false;
    },
    deductWalletAmount(state: AuthState, action: PayloadAction<{ orderAmount: number }>) {
      if (state.user) {
        state.walletBalance = (state.walletBalance || 0) - action.payload.orderAmount;
      }
    },
    updateWalletAmount(state: AuthState, action: PayloadAction<{ walletAmount: number }>) {
      if (state.user) {
        state.walletBalance = action.payload.walletAmount;
      }
    },
  },
});

export const { loginSuccess, logout, deductWalletAmount, updateWalletAmount } = authSlice.actions;

export default authSlice.reducer;
