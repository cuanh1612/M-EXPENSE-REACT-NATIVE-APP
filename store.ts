import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import tripReducer from "./slices/tripSlice";
import expenseReducer from "./slices/expenseSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  trip: tripReducer,
  expense: expenseReducer,
  auth: authReducer
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch