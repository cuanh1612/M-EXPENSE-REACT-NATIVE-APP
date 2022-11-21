import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { IExpense } from "../types/inputTypes";


interface IState {
  isLogin: boolean;
}

const initialState: IState = {
    isLogin: false
};

const authSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setIsLogin(state, action: PayloadAction<{ isLogin: boolean }>) {
      state.isLogin = action.payload.isLogin;
    },
  },
});

export const { setIsLogin } = authSlice.actions;
export default authSlice.reducer;
