import React, { useState } from 'react';
import classes from "./AddExpense.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../store/expenseSlice';

const AddExpense = () => {
    const theme = useSelector(state=>state.theme.theme);
    const email  = useSelector(state=>state.auth.email).replace("@","").replace(".","");
    const dispatch = useDispatch();
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
            let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses${email}.json`,{
                method: "POST",
                body: JSON.stringify(newExpense),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            let result;
            if(response.ok){
                result = await response.json();
                console.log(result);
                
                dispatch(addExpense({ key: result.name, ...newExpense }));
                
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
    <form className={`${theme==="dark"? classes.formDark : classes.form }`} onSubmit={submitHandler}>
        <h1 className={`${theme==="dark"? classes.formHeadingDark : classes.formHeading}`}>Add Expense</h1>
        <div className={classes.control}>
          <label htmlFor='amount' className={`${theme==="dark"? classes.labelDark : classes.label}`}>Amount</label>
          <input 
            type='number' 
            id='amount' 
            required 
            min={0}
            value={amount}
            onChange={amountChangeHandler}
            className={`${theme==="dark"? classes.inputDark : classes.input}`}
            />
        </div>
        <div className={classes.control}>
          <label htmlFor='description' className={`${theme==="dark"? classes.labelDark : classes.label}`}>Description</label>
          <input
            type='text'
            id='description'
            value={description}
            onChange={descriptionChangeHandler}
            required
            className={`${theme==="dark"? classes.inputDark : classes.input}`}
          />
        </div>
        <div className={classes.control}>
                <label htmlFor="category" className={`${theme==="dark"? classes.labelDark : classes.label}`}>Choose Category</label>
                <select 
                    id="category" 
                    className={`${theme==="dark"? classes.dropdownDark : classes.dropdown}`}
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
          <button type="submit" className={`${theme==="dark"? classes.btnDark : classes.btn}`}>Add Expense</button>
        </div>
    </form>
  )
}

export default AddExpense;