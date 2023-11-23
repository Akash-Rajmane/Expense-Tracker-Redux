import React from 'react';
import classes from "./Home.module.css";
import AddExpense from '../../components/add-expense/AddExpense';
import List from '../../components/list/List';

const Home = ({setExpenses,expenses}) => {
  return (
    <>
     <AddExpense setExpenses={setExpenses}/>
     <List expenses={expenses} setExpenses={setExpenses}/>
    </>
  )
}

export default Home;