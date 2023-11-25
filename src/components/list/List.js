import React from 'react';
import classes from "./List.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../store/expenseSlice';

const List = () => {
  const theme = useSelector(state=>state.theme.theme);
  const email  = useSelector(state=>state.auth.email).replace("@","").replace(".","");
  const expenses = useSelector(state=>state.expense.expenses);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = async (key) => {
    try{
      let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses${email}/${key}.json`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        dispatch(deleteExpense({ key }));
        console.log('Expense deleted successfully');
      } else {
        console.error('Failed to delete expense');
      }
    }catch(err){
      console.log(err);
    }
  }

  const editHandler = (key) => {
    navigate(`/edit/${key}`);
  }

  console.log(expenses);

  return (
    <ul className={classes.list}>
        {expenses.map(el=>{
            return(
                <li key={el.id} className={`${theme==="dark"? classes.itemDark : classes.item}`}>
                    <span>{el.description}</span>
                    <span>Rs {el.amount}</span>
                    <span>category: {el.category}</span>
                    <button className={classes.delBtn} onClick={()=>deleteHandler(el.key)}>Delete</button>
                    <button className={classes.editBtn} onClick={()=>editHandler(el.key)}>Edit</button>
                </li>
            )
        })}
    </ul>
  )
}

export default List;