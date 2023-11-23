import React from 'react';
import classes from "./List.module.css";

const List = ({expenses}) => {
  return (
    <ul className={classes.list}>
        {expenses.map(el=>{
            return(
                <li key={el.id} className={classes.item}>
                    <span>{el.description}</span>
                    <span>Rs {el.amount}</span>
                    <span>category: {el.category}</span>
                </li>
            )
        })}
    </ul>
  )
}

export default List;