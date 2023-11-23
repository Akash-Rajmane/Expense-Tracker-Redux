import React, { useState } from 'react';
import classes from "./AddExpense.module.css";

const AddExpense = ({setExpenses}) => {
    const [amount,setAmount] = useState("");
    const [description,setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("fuel");

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    }   

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const categoryChangeHandler = (e) => {
        setSelectedCategory(e.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let newExpense =  {   
            id: new Date().toString(),
            amount: amount,
            description: description,
            category: selectedCategory
        }   
    
        try{
            let response = await fetch("https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses.json",{
                method: "POST",
                body: JSON.stringify(newExpense),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            let result;
            if(response.ok){
                result = await response.json();
                setExpenses(expenses=>{
                    return [
                        ...expenses,
                        newExpense
                    ]
                });
                console.log(result);
                setAmount("");
                setDescription("");
                setSelectedCategory("fuel");
            }else{
                result = await response.json();
                throw new Error(result.error);
            }
        }catch(err){
            console.log(err);
        }
       
    };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <h1>Add Expense</h1>
        <div className={classes.control}>
          <label htmlFor='amount'>Amount</label>
          <input 
            type='number' 
            id='amount' 
            required 
            min={0}
            value={amount}
            onChange={amountChangeHandler}
            />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={descriptionChangeHandler}
            required
          />
        </div>
        <div className={classes.control}>
                <label htmlFor="category">Choose Category</label>
                <select 
                    id="category" 
                    className={classes.dropdown}
                    value={selectedCategory}
                    onChange={categoryChangeHandler}
                >
                    <option value="fuel">fuel</option>
                    <option value="food">food</option>
                    <option value="electricity">electricity</option>
                    <option value="movie">movie</option>
                    <option value="other">other</option>
                </select>
        </div>
        <div className={classes.actions}>
          <button type="submit" >Add Expense</button>
        </div>
    </form>
  )
}

export default AddExpense;