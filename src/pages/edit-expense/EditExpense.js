import React, { useState } from 'react';
import classes from "./EditExpense.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editExpense } from '../../store/expenseSlice';

const EditExpense = () => {
    const theme = useSelector(state=>state.theme.theme);
    const email  = useSelector(state=>state.auth.email).replace("@","").replace(".","");
    const navigate = useNavigate();
    const key = useParams().key;
    const expenses = useSelector(state=>state.expense.expenses);
    const selectedExpense = expenses.find(expense => expense.key === key);
    const [amount, setAmount] = useState(selectedExpense ? selectedExpense.amount : "");
    const [description, setDescription] = useState(selectedExpense ? selectedExpense.description : "");
    const [selectedCategory, setSelectedCategory] = useState(selectedExpense ? selectedExpense.category : "fuel");
    const dispatch = useDispatch();

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

        let updatedExpense =  {   
            amount: amount,
            description: description,
            category: selectedCategory
        }   
    
        try{
            let response = await fetch(`https://expense-tracker-803d3-default-rtdb.firebaseio.com/expenses${email}/${key}.json`,
            {
                method: "PATCH",
                body: JSON.stringify(updatedExpense),
                headers:{
                    "Content-Type":"application/json"
                }
            })

            let result;
            if(response.ok){
                result = await response.json();
                console.log(result);

                dispatch(editExpense({ key: key, ...updatedExpense }));
                
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
    <form className={`${theme==="dark"? classes.formDark : classes.form }`} onSubmit={submitHandler}>
        <h1 className={`${theme==="dark"? classes.formHeadingDark : classes.formHeading}`}>Edit Expense</h1>
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
          <label htmlFor='description'  className={`${theme==="dark"? classes.labelDark : classes.label}`}>Description</label>
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
                <label htmlFor="category"  className={`${theme==="dark"? classes.labelDark : classes.label}`}>Choose Category</label>
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
          <button type="submit" className={`${theme==="dark"? classes.saveBtnDark : classes.saveBtn}`}>Save Expense</button>
          <button type='button' className={`${theme==="dark"? classes.cancelBtnDark : classes.cancelBtn}`} onClick={cancelHandler}>Cancel</button>
        </div>
    </form>
  )
}

export default EditExpense;