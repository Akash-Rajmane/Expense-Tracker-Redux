import { setExpenses } from "./expenseSlice";

export const fetchExpenseData = (email) => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
            `https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses${email}.json`
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch expense data!');
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const expenseData = await fetchData();
        let arr = [];
        for(let key in expenseData){
          let expense = {
            key,
            ...expenseData[key],
          }
          arr.push(expense);
        }
        dispatch(setExpenses({expenses: arr}));
      } catch (error) {
        console.log(error);
      }
    };
  };
