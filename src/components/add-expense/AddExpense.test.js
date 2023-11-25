import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AddExpense from './AddExpense';


const mockStore = configureStore([]);

describe('AddExpense Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      theme: { theme: 'light' }, // Provide any initial state needed
    });
  });

  test('renders Add Expense Button', () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    const addExpenseText = screen.getByRole('heading', { name: 'Add Expense' });
    const addExpenseBtn = screen.getByRole('button', { name: 'Add Expense' });
    expect(addExpenseText).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();
  });

  test('renders filled inputs on screen', () => {
    render(
      <Provider store={store}>
        <AddExpense />
      </Provider>
    );

    const amountInput = screen.getByLabelText('Amount');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Choose Category');

    fireEvent.change(amountInput, { target: { value: '50' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(categoryInput, { target: { value: 'food' } });

    expect(amountInput.value).toBe('50');
    expect(descriptionInput.value).toBe('Test Description');
    expect(categoryInput.value).toBe('food');
  });

  
});
