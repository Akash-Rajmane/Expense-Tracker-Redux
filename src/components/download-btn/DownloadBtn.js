import React from 'react'
import { useSelector } from 'react-redux';
import classes from "./DownloadBtn.module.css";

const DownloadBtn = () => {
    const expenses = useSelector(state=>state.expense.expenses);
    
    const downloadCSV = () => {
        const csvContent =
          "data:text/csv;charset=utf-8," +
          "date,amount,category,description\n" +
          expenses.map(
            (item) =>
              `${item.id},${item.amount},${item.category},${item.description}`,
          ).join("\n");
      
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expense_data.csv");
        document.body.appendChild(link);
        link.click();
      };

  return (
    <button onClick={downloadCSV} className={classes.downloadBtn}>Download Expenses</button>
  )
}

export default DownloadBtn;