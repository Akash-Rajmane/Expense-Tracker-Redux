import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  expenses: []
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },

        editExpense: (state, action) => {
            const updatedExpenses = state.expenses.map(expense => {
                if (expense.key === action.payload.key) {
                    return action.payload;
                } else {
                    return expense;
                }
            });
            state.expenses = updatedExpenses;
        },

        deleteExpense: (state, action) => {
            const filteredExpenses = state.expenses.filter(expense => expense.key !== action.payload.key);
            state.expenses = filteredExpenses;
        },

        setExpenses: (state,action) => {
            state.expenses = action.payload.expenses;
        }
    }
});

export const { addExpense, editExpense, deleteExpense, setExpenses } = expenseSlice.actions;

export default expenseSlice.reducer;