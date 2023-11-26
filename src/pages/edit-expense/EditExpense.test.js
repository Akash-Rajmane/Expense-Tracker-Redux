import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import EditExpense from './EditExpense';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('EditExpense Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      theme: { theme: 'light' },
      auth: { email: 'test@example.com' },
      expense: { expenses: [] }, // Provide any initial state needed
    });
  });

  test('renders Edit Expense Form', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
            <EditExpense />
        </BrowserRouter>
      </Provider>
    );

    const editExpenseText = screen.getByRole('heading', { name: 'Edit Expense' });
    const saveExpenseBtn = screen.getByRole('button', { name: 'Save Expense' });
    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

    expect(editExpenseText).toBeInTheDocument();
    expect(saveExpenseBtn).toBeInTheDocument();
    expect(cancelBtn).toBeInTheDocument();
  });


  test('updates state on input changes', () => {
    render(
        <Provider store={store}>
        <BrowserRouter>
            <EditExpense />
        </BrowserRouter>
      </Provider>
    );

    const amountInput = screen.getByLabelText('Amount');
    const descriptionInput = screen.getByLabelText('Description');
    const categoryInput = screen.getByLabelText('Choose Category');

    fireEvent.change(amountInput, { target: { value: '75' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    fireEvent.change(categoryInput, { target: { value: 'electricity' } });

    expect(amountInput.value).toBe('75');
    expect(descriptionInput.value).toBe('Updated Description');
    expect(categoryInput.value).toBe('electricity');
  });
  
/*

  test('submits form with updated expense data', () => {
    render(
      <Provider store={store}>
        <EditExpense />
      </Provider>
    );

    const saveExpenseBtn = screen.getByRole('button', { name: 'Save Expense' });

    fireEvent.click(saveExpenseBtn);

    // Add assertions for form submission, e.g., check if the dispatch function was called with the correct arguments.
    // You may need to mock the fetch call and adjust the store state accordingly for proper testing.
  });
 */


  test('cancels and navigates to the home page', () => {
    render(
        <Provider store={store}>
        <BrowserRouter>
            <EditExpense />
        </BrowserRouter>
      </Provider>
    );

    const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

    fireEvent.click(cancelBtn);

    // Add assertions for navigation to the home page.
    expect(window.location.pathname).toBe('/');
  });

});