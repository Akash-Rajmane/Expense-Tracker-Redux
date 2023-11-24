import React from 'react';
import AddExpense from '../../components/add-expense/AddExpense';
import List from '../../components/list/List';

const Home = ({setExpenses,expenses}) => {
  return (
    <>
     <AddExpense/>
     <List/>
    </>
  )
}

export default Home;