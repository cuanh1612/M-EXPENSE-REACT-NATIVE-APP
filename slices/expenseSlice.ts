import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { IExpense } from "../types/inputTypes";

export const createExpense = createAsyncThunk(
  "expense/createExpense",
  async ({ expense }: { expense: IExpense }) => {
    let newExpenses: IExpense[] = [];

    const oldExpenseData = await AsyncStorage.getItem("Expense");
    if (oldExpenseData !== null) {
      const oldExpenseDataParse = JSON.parse(oldExpenseData);
      newExpenses = [...oldExpenseDataParse];
    }

    //Save data expense to local storage
    newExpenses = [...newExpenses, expense];
    await AsyncStorage.setItem("Expense", JSON.stringify(newExpenses));

    return newExpenses;
  }
);

export const setExpensesOfTripSelected = createAsyncThunk(
  "expense/setExpensesOfTripSelected",
  async ({ tripId }: { tripId: string }) => {
    let expensesByTrip: IExpense[] = [];

    const oldExpenseData = await AsyncStorage.getItem("Expense");
    if (oldExpenseData !== null) {
      const oldExpenseDataParse: IExpense[] = JSON.parse(oldExpenseData);
      expensesByTrip = oldExpenseDataParse.filter(
        (item) => item.tripId === tripId
      );
    }

    return expensesByTrip;
  }
);

export const getExpenses = createAsyncThunk("expense/getExpenses", async () => {
  let newExpenses: IExpense[] = [];

  //Get data expenses from local storage
  const expenses = await AsyncStorage.getItem("Expense");

  if (expenses !== null) {
    newExpenses = JSON.parse(expenses);
  }

  return newExpenses;
});

export const resetExpenses = createAsyncThunk(
  "expense/resetExpenses",
  async () => {
    await AsyncStorage.setItem("Expense", JSON.stringify([]));
    return true;
  }
);

interface IState {
  expenses: IExpense[];
  expensesOfTripSelected: IExpense[];
}

const initialState: IState = {
  expenses: [],
  expensesOfTripSelected: [],
};

const expensesSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setExpenses(state, action: PayloadAction<{ expenses: IExpense[] }>) {
      state.expenses = action.payload.expenses;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createExpense.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.expenses = action.payload;
        }
      })
      .addCase(setExpensesOfTripSelected.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.expensesOfTripSelected = action.payload;
        }
      })
      .addCase(resetExpenses.fulfilled, (state, action) => {
        if (action.payload !== null) {
          state.expenses = [];
          state.expensesOfTripSelected = [];
        }
      });
  },
});

export const { setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
