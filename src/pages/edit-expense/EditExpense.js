import React, { useEffect, useState, useCallback } from 'react';
import classes from "./EditExpense.module.css";
import { useNavigate, useParams } from "react-router-dom";

const EditExpense = ({setExpenses,expenses}) => {
    const navigate = useNavigate();
    const key = useParams().key;
    const [amount,setAmount] = useState("");
    const [description,setDescription] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("fuel");

    const fetchExpenseData = useCallback(async () => {
        try{
            let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses/${key}.json`);
            let result;
            if(response.ok){
                result = await response.json();
                setAmount(result.amount);
                setDescription(result.description);
                setSelectedCategory(result.category);
            }else{
                result = await response.json();
                throw new Error(result.error);
            }
        }catch(err){
            console.log(err);
        }
    },[key])

    useEffect(()=>{
        fetchExpenseData();
    },[fetchExpenseData])

    const amountChangeHandler = (e) => {
        setAmount(e.target.value);
    }   

    const descriptionChangeHandler = (e) => {
        setDescription(e.target.value);
    }

    const categoryChangeHandler = (e) => {
        setSelectedCategory(e.target.value);
    }

    const cancelHandler = () => {
        navigate("/");
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        let newExpense =  {   
            amount: amount,
            description: description,
            category: selectedCategory
        }   
    
        try{
            let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses/${key}.json`,
            {
                method: "PATCH",
                body: JSON.stringify(newExpense),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            let result;
            if(response.ok){
                result = await response.json();
                console.log(result);
                let newExpenses = expenses.map(el=>{
                    if(el.key===key){
                        return {
                            id: el.id,
                            amount: amount,
                            description: description,
                            category: selectedCategory
                        }
                    }else{
                        return el;
                    }
                })
                setExpenses(newExpenses);
                
                setAmount("");
                setDescription("");
                setSelectedCategory("fuel");
                navigate("/");
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
        <h1>Edit Expense</h1>
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
          <button type="submit" className={classes.saveBtn}>Save Expense</button>
          <button type='button' className={classes.cancelBtn} onClick={cancelHandler}>Cancel</button>
        </div>
    </form>
  )
}

export default EditExpense;