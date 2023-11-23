import React from 'react';
import classes from "./List.module.css";
import { useNavigate } from 'react-router-dom';

const List = ({expenses,setExpenses}) => {
  const navigate = useNavigate();

  const deleteHandler = async (key) => {
    try{
      let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses/${key}.json`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        let newExpenses = expenses.filter(el=>el.key!==key);
        setExpenses(newExpenses);
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

  return (
    <ul className={classes.list}>
        {expenses.map(el=>{
            return(
                <li key={el.id} className={classes.item}>
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